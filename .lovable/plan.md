

# Add "מצא בעל מקצוע" CTA Inside Chat

## Overview
Add a Call-to-Action button inside the chat messages area that appears after the AI agent provides a final quote. The button will be styled as a prominent action within the conversation flow.

## Current Behavior
- When a final quote is generated, `proSummary` state is set
- A "צפה בסיכום מקצועי" button appears **outside** the chat card
- No CTA exists inside the chat itself

## Proposed Change
Add a CTA button **inside the chat messages area** after the last assistant message when `proSummary` exists.

## Implementation

### File to Modify
`src/components/AIChat.tsx`

### Add Icon Import
```typescript
import { Search } from "lucide-react";
```

### Update Messages Rendering (Lines 379-407)
After rendering the messages, add a CTA block that appears when `proSummary` is set:

```tsx
{messages.length === 0 ? (
  // ... empty state unchanged
) : (
  <>
    {messages.map((msg) => (
      // ... existing message rendering
    ))}
    
    {/* Find Professional CTA - appears after quote */}
    {proSummary && (
      <div className="flex justify-center pt-4">
        <Button
          onClick={() => {
            // TODO: Navigate to professional matching or trigger action
            toast({
              title: "מחפשים בעל מקצוע",
              description: "בקרוב נמצא לך את בעל המקצוע המתאים",
            });
          }}
          className="gap-2 px-6"
          size="lg"
        >
          <Search className="h-5 w-5" />
          מצא בעל מקצוע
        </Button>
      </div>
    )}
  </>
)}
```

### Visual Design
- Button appears centered below the last message
- Uses primary color styling (consistent with app theme)
- Includes a search icon for visual clarity
- Has some top padding to separate from the last message

### User Flow
1. User describes their problem
2. AI asks clarifying questions (if needed)
3. AI provides final quote with `---PRO_SUMMARY---` block
4. CTA "מצא בעל מקצוע" appears inside the chat
5. User can click to proceed to professional matching

## Technical Notes
- The CTA only appears when `proSummary` is truthy (quote was generated)
- Clicking the button currently shows a toast - this can be extended to navigate to a matching page
- The button is placed inside the scrollable messages area so it stays contextual

