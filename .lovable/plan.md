

# WhatsApp-Style Input with Buttons Inside

## Overview
Move all action buttons (ImagePlus, Mic/Send) inside the pill-shaped input container to match WhatsApp Web's design, and change the send button color from green to the app's primary blue color.

## Current State
```
[📷 Button] [____Input Container____] [Mic/Send Button]
```
- Buttons are outside the input container
- Send button uses `bg-green-500`

## Target State
```
[📷 ____Input Text____ Mic/Send]
      ^---- All inside one pill-shaped container ----^
```
- All elements inside one unified pill container
- Send button uses `bg-primary` (blue)

---

## File to Modify
`src/components/AIChat.tsx`

## Changes (Lines 438-489)

### New Layout Structure
```tsx
<div className="flex items-end gap-2">
  {/* Single Pill-shaped Container with everything inside */}
  <div className="flex-1 flex items-center bg-background rounded-full border border-input px-2 py-1 gap-1">
    {/* ImagePlus Button - inside left */}
    <Button
      variant="ghost"
      size="icon"
      onClick={() => fileInputRef.current?.click()}
      disabled={isLoading}
      title="העלה תמונה"
      className="h-8 w-8 rounded-full shrink-0 text-muted-foreground hover:text-foreground"
    >
      <ImagePlus className="h-5 w-5" />
    </Button>
    
    {/* Textarea - center, flexible width */}
    <Textarea
      placeholder="תאר את העבודה שצריך לעשות..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={handleKeyPress}
      className="flex-1 resize-none border-0 bg-transparent min-h-[24px] max-h-[120px] py-2 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
      disabled={isLoading}
      rows={1}
    />
    
    {/* Mic or Send Button - inside right */}
    {message.trim() || selectedImage ? (
      <Button
        onClick={handleSend}
        disabled={isLoading}
        size="icon"
        className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
      >
        {isLoading ? (
          <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    ) : (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleListening}
        disabled={isLoading}
        className={`h-8 w-8 rounded-full shrink-0 ${isListening ? 'text-red-500 animate-pulse bg-red-50' : 'text-muted-foreground hover:text-foreground'}`}
      >
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
    )}
  </div>
</div>
```

## Key Changes Summary

| Element | Before | After |
|---------|--------|-------|
| Layout | 3 separate elements in flex | 1 container with 3 elements inside |
| ImagePlus button | Outside, h-10 w-10 | Inside left, h-8 w-8 |
| Mic/Send button | Outside, h-10 w-10 | Inside right, h-8 w-8 |
| Send button color | `bg-green-500` | `bg-primary` (app's blue) |
| Container padding | `px-4 py-2` | `px-2 py-1` (tighter for internal buttons) |
| Icon sizes | `h-5 w-5` | `h-4 w-4` (slightly smaller to fit) |

## Visual Result
A single unified pill-shaped input field with the image upload icon on the left inside, text input in the middle, and mic/send button on the right inside - matching WhatsApp Web's clean, integrated design.

