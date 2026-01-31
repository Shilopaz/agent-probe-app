
# Update Quick Categories & Auto-Start Chat Flow

## Overview
Update the quick categories with the new Hebrew labels and enhance the user experience so that clicking a category scrolls to the chat and automatically sends the message to start the AI conversation.

## Changes Required

### 1. Update Categories in Lobby.tsx

**New Categories:**
| Hebrew Label | Icon | Prompt |
|--------------|------|--------|
| הנדימן | Hammer | אני צריך שירותי הנדימן |
| חיבור מכשירי חשמל | Plug | אני צריך לחבר מכשיר חשמלי |
| הובלות קטנות | Truck | אני צריך הובלה קטנה |
| ניקיון וסדר | Sparkles | אני צריך שירותי ניקיון וסדר |
| מנעולן | Key | אני צריך מנעולן |
| הרכבת רהיטים | Armchair | אני צריך להרכיב רהיטים |

### 2. Add Auto-Send Behavior

When a category is clicked:
1. Scroll smoothly to the chat component
2. Automatically send the category prompt as a message (not just fill the input)

**Implementation approach:**
- Add a `ref` to the AIChat section for scroll targeting
- Add a new prop `autoSend?: boolean` to AIChat component
- When `initialMessage` changes and `autoSend` is true, automatically trigger `handleSend()`
- Update the `useEffect` to handle auto-sending instead of just filling the input

### 3. File Changes

**src/pages/Lobby.tsx:**
- Update icon imports: Replace `Tv, Wrench, Snowflake, Zap` with `Hammer, Plug, Truck, Sparkles, Key`
- Update `quickCategories` array with new labels and prompts
- Add a ref for the chat section
- Add smooth scroll behavior when category is clicked
- Pass `autoSend={true}` when a category is selected

**src/components/AIChat.tsx:**
- Add optional `autoSend` prop to interface
- Modify `useEffect` to auto-send the message when `initialMessage` is provided and `autoSend` is true

---

## Technical Details

### Updated AIChat Props
```typescript
interface AIChatProps {
  initialMessage?: string;
  onNewChat?: () => void;
  autoSend?: boolean;  // NEW: auto-send the initial message
}
```

### Updated useEffect in AIChat
Instead of just setting the message, it will:
1. Set the message
2. If `autoSend` is true, trigger `handleSend()` after a brief delay

### Scroll Behavior in Lobby
```typescript
const chatRef = useRef<HTMLDivElement>(null);

const handleCategoryClick = (prompt: string) => {
  setSelectedPrompt(prompt);
  chatRef.current?.scrollIntoView({ behavior: 'smooth' });
};
```

### Updated quickCategories
```typescript
const quickCategories = [
  { icon: Hammer, label: "הנדימן", prompt: "אני צריך שירותי הנדימן" },
  { icon: Plug, label: "חיבור מכשירי חשמל", prompt: "אני צריך לחבר מכשיר חשמלי" },
  { icon: Truck, label: "הובלות קטנות", prompt: "אני צריך הובלה קטנה" },
  { icon: Sparkles, label: "ניקיון וסדר", prompt: "אני צריך שירותי ניקיון וסדר" },
  { icon: Key, label: "מנעולן", prompt: "אני צריך מנעולן" },
  { icon: Armchair, label: "הרכבת רהיטים", prompt: "אני צריך להרכיב רהיטים" },
];
```

## User Flow After Implementation
1. User sees the lobby with quick categories at the bottom
2. User clicks "הנדימן" (Handyman)
3. Page smoothly scrolls up to the chat
4. Message "אני צריך שירותי הנדימן" is automatically sent
5. AI responds with follow-up questions about the handyman service needed
