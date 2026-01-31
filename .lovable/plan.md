
# Integrate AI Chat Component into Lobby

## Overview
Replace the simple text input in the Lobby page with the full AI chat component from the landing page, keeping the personalized header and quick categories.

## Current State
- **Lobby**: Has a simple `Textarea` and a button that doesn't connect to the AI flow
- **AIQuoteSection**: Full chat with messages, image upload, suggestions, pro summary, and backend integration

## Implementation Approach

### Option A: Extract Reusable Chat Component (Recommended)
Create a standalone `AIChat` component that can be used in both the landing page and the lobby.

**New File:** `src/components/AIChat.tsx`
- Extract the chat card UI and all logic from `AIQuoteSection`
- Make it a self-contained component
- Include: messages display, input area, image upload, suggestions, pro summary

**Update:** `src/components/AIQuoteSection.tsx`
- Import and use the new `AIChat` component
- Keep the section wrapper with title and description

**Update:** `src/pages/Lobby.tsx`
- Replace the simple input Card with the `AIChat` component
- Keep the header, welcome message, quick categories, and footer links
- When a quick category is clicked, pass the prompt to the chat component

### Files to Create
1. `src/components/AIChat.tsx` - Reusable chat component

### Files to Modify
1. `src/components/AIQuoteSection.tsx` - Use the new AIChat component
2. `src/pages/Lobby.tsx` - Integrate AIChat instead of simple input

## Technical Details

### AIChat Component Props
```text
AIChat Component
+-- initialMessage?: string  (for auto-starting with a category prompt)
+-- onNewChat?: () => void   (callback when new chat is started)
```

### Lobby Integration
- Remove the simple `Textarea` and `Card`
- Add `AIChat` component in its place
- Quick category buttons will call a function to set the initial message in the chat
- The welcome headline stays above the chat

### Component Structure (Lobby)
```text
Header (Logo + Profile)
    |
Welcome Message ("שלום {name}, במה אפשר לעזור היום?")
    |
AIChat Component (full chat with messages, input, suggestions)
    |
Quick Categories Grid (optional shortcuts)
    |
Footer Links
```

### Key Features Preserved
- Full message history display
- Image upload functionality
- Suggestion chips in empty state
- Pro summary panel after quote
- New chat button
- Loading states
- Toast notifications
