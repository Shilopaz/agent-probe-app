import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      const { data, error } = await supabase.functions.invoke("test-agent", {
        body: { message: message.trim() },
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setResponse(data.response || "No response received");
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to get response from agent",
        variant: "destructive",
      });
      setResponse("Error: " + (error.message || "Failed to get response"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Gemini Agent Test</h1>
          <p className="text-sm text-muted-foreground">Test your agent with simple messages</p>
        </div>

        <div className="space-y-4">
          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] resize-none"
          />

          <Button 
            onClick={handleSend} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>

          {response && (
            <div className="mt-6 p-4 bg-card border border-border rounded-lg">
              <h2 className="text-sm font-medium text-foreground mb-2">Response:</h2>
              <p className="text-sm text-foreground whitespace-pre-wrap">{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
