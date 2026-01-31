import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PlusCircle, ImagePlus, X, Eye } from "lucide-react";
import ProSummaryPanel from "@/components/ProSummaryPanel";

const SUGGESTIONS = [
  { icon: "🚿", text: "נזילה מהברז במטבח" },
  { icon: "📺", text: "תליית טלוויזיה על הקיר" },
  { icon: "💡", text: "החלפת מנורה בתקרה" },
  { icon: "🚽", text: "סתימה באסלה" },
  { icon: "🪑", text: "הרכבת רהיט מאיקאה" },
  { icon: "❄️", text: "ניקוי מזגן" },
];

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
};

type ProSummary = {
  totalPrice: string;
  problemTitle: string;
  professionalExplanation: string;
};

interface AIChatProps {
  initialMessage?: string;
  onNewChat?: () => void;
  autoSend?: boolean;
}

const parseProSummary = (response: string): { cleanResponse: string; proSummary: ProSummary | null } => {
  const proSummaryMatch = response.match(/---PRO_SUMMARY---([\s\S]*?)---END_PRO_SUMMARY---/);
  
  if (!proSummaryMatch) {
    return { cleanResponse: response, proSummary: null };
  }

  const proSummaryContent = proSummaryMatch[1];
  const cleanResponse = response.replace(/---PRO_SUMMARY---[\s\S]*?---END_PRO_SUMMARY---/, '').trim();

  const totalPriceMatch = proSummaryContent.match(/TOTAL_PRICE:\s*(.+)/);
  const problemTitleMatch = proSummaryContent.match(/PROBLEM_TITLE:\s*(.+)/);
  const professionalExplanationMatch = proSummaryContent.match(/PROFESSIONAL_EXPLANATION:\s*([\s\S]+?)(?=$)/);

  if (totalPriceMatch && problemTitleMatch && professionalExplanationMatch) {
    return {
      cleanResponse,
      proSummary: {
        totalPrice: totalPriceMatch[1].trim(),
        problemTitle: problemTitleMatch[1].trim(),
        professionalExplanation: professionalExplanationMatch[1].trim()
      }
    };
  }

  return { cleanResponse: response, proSummary: null };
};

const AIChat = ({ initialMessage, onNewChat, autoSend = false }: AIChatProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [proSummary, setProSummary] = useState<ProSummary | null>(null);
  const [showProSummary, setShowProSummary] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Handle initial message from props (e.g., from quick categories)
  // Track if we've already auto-sent for this initialMessage
  const autoSentRef = useRef<string | null>(null);
  
  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      setMessage(initialMessage);
      
      // Auto-send if enabled and we haven't already sent this message
      if (autoSend && autoSentRef.current !== initialMessage) {
        autoSentRef.current = initialMessage;
        // Small delay to ensure state is updated
        setTimeout(() => {
          handleSendWithMessage(initialMessage);
        }, 100);
      }
    }
  }, [initialMessage, messages.length, autoSend]);

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

  const handleSendWithMessage = async (messageToSend: string) => {
    if (!messageToSend.trim() && !selectedImage) {
      toast({
        title: "שגיאה",
        description: "יש להזין הודעה או לבחור תמונה",
        variant: "destructive",
      });
      return;
    }

    const userMessage = messageToSend.trim();
    setMessage("");
    setIsLoading(true);

    let uploadedImageUrl: string | null = null;

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

    const currentImagePreview = imagePreview;
    removeImage();

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

      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId);
      }

      const { cleanResponse, proSummary: newProSummary } = parseProSummary(data.response || "No response received");

      if (newProSummary) {
        setProSummary(newProSummary);
      }

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: cleanResponse
      };
      setMessages(prev => [...prev, assistantMsg]);

    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "שגיאה",
        description: error.message || "נכשל בקבלת תשובה מהסוכן",
        variant: "destructive",
      });
      setMessages(prev => prev.filter(m => m.id !== tempUserMsg.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    handleSendWithMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (text: string) => {
    setMessage(text);
  };

  const handleNewChat = () => {
    setMessages([]);
    setConversationId(null);
    setMessage("");
    setProSummary(null);
    setShowProSummary(false);
    removeImage();
    onNewChat?.();
    toast({
      title: "צ'אט חדש",
      description: "מוכן לעבודה הבאה שלך",
    });
  };

  return (
    <>
      <div className="max-w-2xl mx-auto">
        {/* Chat Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
            <h3 className="text-lg font-semibold text-foreground">תאר את העבודה</h3>
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNewChat}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <PlusCircle className="h-4 w-4" />
                צ'אט חדש
              </Button>
            )}
          </div>

          {/* Messages container */}
          <div className="h-[350px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p>תאר את העבודה שאתה צריך ונחשב לך מחיר מיידי</p>
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[85%] ${
                    msg.role === 'user'
                      ? 'mr-auto'
                      : 'ml-auto'
                  }`}
                >
                  <div
                    className={`p-4 rounded-2xl shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted/80 backdrop-blur-sm border border-border rounded-bl-md'
                    }`}
                  >
                    {msg.imageUrl && (
                      <img 
                        src={msg.imageUrl} 
                        alt="Uploaded" 
                        className="max-w-full max-h-40 rounded-lg mb-3 object-contain"
                      />
                    )}
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Image preview */}
          {imagePreview && (
            <div className="px-4 pb-2">
              <div className="relative inline-block">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-20 rounded-lg border border-border"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}

          {/* Input area */}
          <div className="p-4 border-t border-border bg-muted/20">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              ref={fileInputRef}
              className="hidden"
            />
            <div className="relative flex items-end border border-input rounded-md bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                title="העלה תמונה"
                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
              >
                <ImagePlus className="h-4 w-4" />
              </Button>
              <Textarea
                placeholder="תאר את העבודה שצריך לעשות..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="min-h-[48px] max-h-[120px] resize-none flex-1 text-sm border-0 bg-transparent pl-12 focus-visible:ring-0 focus-visible:ring-offset-0"
                disabled={isLoading}
              />
            </div>
            <Button 
              onClick={handleSend} 
              disabled={isLoading || (!message.trim() && !selectedImage)}
              className="w-full mt-3"
            >
              {isLoading ? "מעבד..." : "קבל הצעת מחיר"}
            </Button>
          </div>

          {/* Suggestion chips - only show when no messages */}
          {messages.length === 0 && (
            <div className="p-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">💡 נסה לשאול:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-muted/50 hover:bg-muted border border-border rounded-full transition-all hover:scale-105 hover:shadow-sm"
                  >
                    <span>{suggestion.icon}</span>
                    <span>{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pro View CTA - appears when quote is ready */}
        {proSummary && (
          <div className="mt-6 text-center">
            <Button
              onClick={() => setShowProSummary(true)}
              variant="outline"
              size="lg"
              className="gap-2 border-primary/30 hover:bg-primary/5 hover:border-primary/50"
            >
              <Eye className="h-5 w-5" />
              צפה בסיכום מקצועי
            </Button>
          </div>
        )}
      </div>

      {/* Pro Summary Modal */}
      <ProSummaryPanel 
        summary={proSummary} 
        isOpen={showProSummary} 
        onClose={() => setShowProSummary(false)} 
      />
    </>
  );
};

export default AIChat;
