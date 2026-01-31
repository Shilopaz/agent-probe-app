
# Move Upload Image Button Inside Input

## Overview
Relocate the image upload button from beside the textarea to inside the input area, creating a more modern chat interface similar to popular messaging apps.

## Current State
- Upload image button is positioned as a separate button to the left of the textarea
- Uses `flex gap-3 items-end` layout with button and textarea as siblings

## Implementation Approach

### Design
Create a container wrapper around the textarea that includes the upload button positioned inside, similar to how ChatGPT and other modern chat interfaces work.

```
Before:
[📷 Button] [___Textarea___]

After:
[📷 ___Textarea___________]
```

### File to Modify
`src/components/AIChat.tsx`

### Changes (Lines 342-369)

1. **Wrap textarea in a relative container** - Create a div that contains both the textarea and the button
2. **Position button absolutely inside** - Use absolute positioning to place the button inside the textarea area (right side for RTL)
3. **Add padding to textarea** - Add right padding to prevent text from overlapping with the button
4. **Style the container** - Add border and background to create unified input appearance

### Code Structure
```text
Input Container (relative, border, rounded, bg-background)
├── Hidden file input
├── Textarea (no border, transparent bg, right padding for button space)
└── Upload Button (absolute positioned, inside right side)
```

### Styling Details
- Container: `relative flex items-end border rounded-md bg-background`
- Textarea: `border-0 focus-visible:ring-0 pr-12` (remove border, add right padding)
- Button: `absolute left-2 bottom-2` (positioned inside, RTL-aware)

### Visual Result
A single unified input field with the image upload icon neatly positioned inside the input area, providing a cleaner, more modern look.
