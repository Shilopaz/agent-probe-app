import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PlusCircle, ImagePlus, X } from "lucide-react";

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
};

const Index = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "קובץ גדול מדי",
          description: "גודל מקסימלי 5MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('chat-images')
      .upload(fileName, file);

    if (error) {
      console.error('Image upload error:', error);
      throw new Error('Failed to upload image');
    }

    const { data: urlData } = supabase.storage
      .from('chat-images')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  };

  const handleSend = async () => {
    if (!message.trim() && !selectedImage) {
      toast({
        title: "Error",
        description: "Please enter a message or select an image",
        variant: "destructive",
      });
      return;
    }

    const userMessage = message.trim();
    setMessage("");
    setIsLoading(true);

    let uploadedImageUrl: string | null = null;

    // Upload image if selected
    if (selectedImage) {
      try {
        uploadedImageUrl = await uploadImage(selectedImage);
      } catch (error) {
        toast({
          title: "שגיאה בהעלאת תמונה",
          description: "נסה שוב",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
    }

    // Clear image preview
    const currentImagePreview = imagePreview;
    removeImage();

    // Add user message to UI immediately
    const tempUserMsg: Message = {
      id: `temp-${Date.now()}`,
      role: 'user',
      content: userMessage || "📷 תמונה",
      imageUrl: currentImagePreview || undefined
    };
    setMessages(prev => [...prev, tempUserMsg]);

    try {
      const { data, error } = await supabase.functions.invoke("test-agent", {
        body: { 
          message: userMessage || "הנה תמונה של הבעיה",
          conversationId,
          imageUrl: uploadedImageUrl
        },
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      // Update conversation ID if new
      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId);
      }

      // Add assistant response
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response || "No response received"
      };
      setMessages(prev => [...prev, assistantMsg]);

    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to get response from agent",
        variant: "destructive",
      });
      // Remove the user message on error
      setMessages(prev => prev.filter(m => m.id !== tempUserMsg.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setConversationId(null);
    setMessage("");
    removeImage();
    toast({
      title: "New chat started",
      description: "Ready for your next handyman job",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[600px] flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">Handyman Quote Agent</h1>
            <p className="text-sm text-muted-foreground">Get instant quotes for your handyman jobs</p>
          </div>
          {messages.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleNewChat}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              New Chat
            </Button>
          )}
        </div>

        {/* Messages container */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-card border border-border rounded-lg">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              Start by describing your handyman job
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground ml-8'
                    : 'bg-muted mr-8'
                }`}
              >
                {msg.imageUrl && (
                  <img 
                    src={msg.imageUrl} 
                    alt="Uploaded" 
                    className="max-w-full max-h-48 rounded-lg mb-2 object-contain"
                  />
                )}
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))
          )}
        </div>

        {/* Image preview */}
        {imagePreview && (
          <div className="relative inline-block">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="max-h-24 rounded-lg border border-border"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Input area */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              ref={fileInputRef}
              className="hidden"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              title="Upload image"
            >
              <ImagePlus className="h-5 w-5" />
            </Button>
            <Textarea
              placeholder="Describe your handyman job..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="min-h-[80px] resize-none flex-1"
              disabled={isLoading}
            />
          </div>
          <Button 
            onClick={handleSend} 
            disabled={isLoading || (!message.trim() && !selectedImage)}
            className="w-full"
          >
            {isLoading ? "Thinking..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;