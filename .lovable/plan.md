

# Center the Upload Image Button

## Overview
Adjust the upload image button positioning to be vertically centered within the input container.

## Current State
The button uses `absolute left-2 bottom-2` which places it at the bottom-left of the input area.

## Change Required

**File:** `src/components/AIChat.tsx`

**Line 351** - Update the button className:

From:
```
absolute left-2 bottom-2 h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground
```

To:
```
absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground
```

## Technical Details
- `top-1/2` positions the button's top edge at 50% of the container height
- `-translate-y-1/2` shifts it up by half its own height, achieving true vertical centering
- This works regardless of the textarea height (whether single line or multi-line)

