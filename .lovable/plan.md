

# Quote Section Redesign & Header Centering

## Overview
Redesign the AI Quote section with a modern, polished look, hide the Pro Summary panel until the quote is complete, and fix the navbar to properly center the navigation links.

---

## Changes Summary

### 1. Navbar - Center Navigation Links

**File:** `src/components/Navbar.tsx`

**Current Issue:** The navbar uses `justify-between` which distributes items evenly, but the middle section isn't truly centered on the screen.

**Solution:** Use a 3-column grid layout to ensure the middle navigation is perfectly centered:

```text
┌────────────────────────────────────────────────────────────────┐
│  [CTAs]          [איך זה עובד | קטגוריות | מחירים]          [2Tusk] │
│  (flex-start)              (center)                  (flex-end) │
└────────────────────────────────────────────────────────────────┘
```

**Changes:**
- Replace `flex justify-between` with `grid grid-cols-3`
- Left column: CTAs with `justify-self-start`
- Center column: Navigation links with `justify-self-center`  
- Right column: Logo with `justify-self-end`

---

### 2. AI Quote Section - Complete Redesign

**File:** `src/components/AIQuoteSection.tsx`

**Current State:**
- 2/3 chat + 1/3 Pro Summary side-by-side layout
- Pro Summary always visible

**New Design:**
- Full-width chat section with improved styling
- Pro Summary hidden by default
- "Pro View" CTA button appears after quote is complete
- Clicking "Pro View" reveals the Pro Summary in a modal/overlay

**Visual Layout:**

```text
┌─────────────────────────────────────────────────────────────┐
│                    קבל הצעת מחיר מיידית                       │
│     תאר את העבודה והבינה המלאכותית תחשב לך מחיר בזמן אמת     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                     │    │
│  │               Chat Messages Area                    │    │
│  │         (Modern cards with shadows)                 │    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  [📷]  [           Input textarea            ]      │    │
│  │        [        קבל הצעת מחיר        ]              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  When quote is ready:                               │    │
│  │     [ 👁️ Pro View - צפה בסיכום מקצועי ]             │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

**Key Changes:**
- Add `showProSummary` state (boolean, default: `false`)
- Chat area becomes full width (max-w-2xl centered)
- Add gradient backgrounds and subtle shadows
- Modern message bubbles with better spacing
- "Pro View" CTA button appears below the chat when `proSummary` exists
- Clicking "Pro View" sets `showProSummary = true`

---

### 3. Pro Summary Panel - Modal/Overlay Design

**File:** `src/components/ProSummaryPanel.tsx`

**Changes:**
- Convert to a modal/dialog overlay
- Add close button
- Add backdrop blur effect
- Animate entrance with slide-up effect

**New Props:**
```typescript
type ProSummaryPanelProps = {
  summary: ProSummary | null;
  isOpen: boolean;
  onClose: () => void;
};
```

**Visual:**
```text
┌────────────────────────────────────────────┐
│  ╔════════════════════════════════════╗    │
│  ║   סיכום לבעל מקצוע          [X]   ║    │
│  ╠════════════════════════════════════╣    │
│  ║                                    ║    │
│  ║   ┌──────────────────────────┐     ║    │
│  ║   │  מחיר כולל: ₪350        │     ║    │
│  ║   └──────────────────────────┘     ║    │
│  ║                                    ║    │
│  ║   כותרת: תיקון נזילה בברז מטבח    ║    │
│  ║                                    ║    │
│  ║   הסבר מקצועי:                    ║    │
│  ║   [Professional text area]         ║    │
│  ║                                    ║    │
│  ╚════════════════════════════════════╝    │
│                (backdrop blur)              │
└────────────────────────────────────────────┘
```

---

## Detailed Implementation

### File 1: `src/components/Navbar.tsx`

- Change container from flex to `grid grid-cols-3`
- Logo: `justify-self-end`
- Navigation: `justify-self-center`
- CTAs: `justify-self-start`

### File 2: `src/components/AIQuoteSection.tsx`

- Remove the 2/3 - 1/3 split layout
- Add `showProSummary` state
- Chat section becomes centered with `max-w-2xl mx-auto`
- Add gradient background to section
- Improve message styling with shadows and better colors
- Add "Pro View" CTA button that appears when `proSummary` exists
- Pass `isOpen` and `onClose` props to `ProSummaryPanel`
- Use Shadcn Dialog component for the modal

### File 3: `src/components/ProSummaryPanel.tsx`

- Wrap content in Shadcn `Dialog` component
- Add `isOpen` and `onClose` props
- Style with modern card design
- Add smooth entrance animation

---

## Visual Improvements

| Element | Current | New |
|---------|---------|-----|
| Chat container | Plain border | Gradient border, shadow-lg |
| Messages | Simple rounded | Glass effect, better spacing |
| Input area | Basic | Floating card with shadow |
| Pro View CTA | N/A | Primary button with icon |
| Pro Summary | Always visible sidebar | Modal overlay with backdrop |

