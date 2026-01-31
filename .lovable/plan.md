

# WhatsApp-Style Input with Speech-to-Text

## Overview
Transform the chat input to match the WhatsApp Web design while keeping the current ImagePlus icon, and add speech-to-text functionality using the browser's native Web Speech API.

## Part 1: WhatsApp-Style Input Design

### Layout Structure
```
[📷 ImagePlus Button] [Pill-shaped Input Field] [Mic/Send Button]
```

- Keep the existing ImagePlus icon on the left
- When input is empty: Show microphone icon on right
- When input has text: Show green circular send button on right
- Pill-shaped input container with auto-expanding height

### Visual Changes
| Element | Current | New WhatsApp Style |
|---------|---------|-------------------|
| Container Shape | Rounded rectangle | Pill-shaped (rounded-full) |
| Left Icon | ImagePlus (keep) | ImagePlus (unchanged) |
| Right Side | Full-width button below | Inline Mic/Send circular button |
| Send Button | Below input, full width | Circular green button, inline |

## Part 2: Speech-to-Text

### Technology
- **Web Speech API** (browser native, free, no API key needed)
- Configured for Hebrew (`he-IL`)
- Real-time transcription as user speaks

### User Flow
1. Tap microphone icon (when input is empty)
2. Icon turns red with pulse animation
3. Speak in Hebrew
4. Text appears in input field
5. Edit or send the transcribed text

---

## Technical Implementation

### File to Modify
`src/components/AIChat.tsx`

### New Imports
```typescript
import { Mic, MicOff, Send } from "lucide-react";
```

### New State & Refs
```typescript
const [isListening, setIsListening] = useState(false);
const recognitionRef = useRef<SpeechRecognition | null>(null);
```

### TypeScript Declaration (add before component)
```typescript
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
```

### Speech Recognition Setup (new useEffect)
```typescript
useEffect(() => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'he-IL';
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      setMessage(transcript);
    };
    
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
  }
}, []);
```

### Toggle Listening Function
```typescript
const toggleListening = () => {
  if (!recognitionRef.current) {
    toast({
      title: "לא נתמך",
      description: "הדפדפן שלך לא תומך בזיהוי קולי",
      variant: "destructive",
    });
    return;
  }

  if (isListening) {
    recognitionRef.current.stop();
  } else {
    recognitionRef.current.start();
    setIsListening(true);
  }
};
```

### Updated Input Layout
```tsx
<div className="p-4 border-t border-border bg-muted/20">
  <input type="file" ... /> {/* Hidden file input - unchanged */}
  
  <div className="flex items-end gap-2">
    {/* ImagePlus Button - circular, left side */}
    <Button
      variant="ghost"
      size="icon"
      onClick={() => fileInputRef.current?.click()}
      disabled={isLoading}
      title="העלה תמונה"
      className="h-10 w-10 rounded-full shrink-0 text-muted-foreground hover:text-foreground"
    >
      <ImagePlus className="h-5 w-5" />
    </Button>
    
    {/* Pill-shaped Input Container */}
    <div className="flex-1 flex items-center bg-background rounded-full border border-input px-4 py-2">
      <Textarea
        placeholder="תאר את העבודה שצריך לעשות..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1 resize-none border-0 bg-transparent min-h-[24px] max-h-[120px] py-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
        disabled={isLoading}
        rows={1}
      />
    </div>
    
    {/* Mic or Send Button - right side */}
    {message.trim() || selectedImage ? (
      <Button
        onClick={handleSend}
        disabled={isLoading}
        size="icon"
        className="h-10 w-10 rounded-full bg-green-500 hover:bg-green-600 text-white shrink-0"
      >
        <Send className="h-5 w-5" />
      </Button>
    ) : (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleListening}
        disabled={isLoading}
        className={`h-10 w-10 rounded-full shrink-0 ${isListening ? 'text-red-500 animate-pulse bg-red-50' : 'text-muted-foreground hover:text-foreground'}`}
      >
        {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </Button>
    )}
  </div>
</div>
```

### Remove
- The full-width "קבל הצעת מחיר" button below the input (replaced by inline send button)

## Summary

1. **Keep ImagePlus icon** - Move to circular button on left
2. **Pill-shaped input** - `rounded-full` container for the textarea
3. **Dynamic right button**:
   - Microphone (gray) when empty
   - Green Send button when there's text
4. **Speech-to-text** - Web Speech API with Hebrew support
5. **Visual feedback** - Red pulsing animation when recording

