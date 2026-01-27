

# 2Tusk - AI-Driven Home Services Landing Page (Hebrew RTL)

## Overview
Transform the current handyman quote agent into a full 2Tusk landing page mockup with proper Hebrew RTL support, professional styling, and the existing AI quote flow integrated into the page.

---

## Architecture

```text
┌─────────────────────────────────────────────────────────────────┐
│                         Landing Page                             │
├─────────────────────────────────────────────────────────────────┤
│  Navbar (2Tusk branding + navigation)                           │
├─────────────────────────────────────────────────────────────────┤
│  Hero Section (Headline + CTAs)                                 │
├─────────────────────────────────────────────────────────────────┤
│  AI Quote Section (2/3 chat + 1/3 pro summary)                  │
├─────────────────────────────────────────────────────────────────┤
│  How It Works (3 steps)                                         │
├─────────────────────────────────────────────────────────────────┤
│  Categories Grid (6 service categories)                         │
├─────────────────────────────────────────────────────────────────┤
│  Trust & Safety Section                                         │
├─────────────────────────────────────────────────────────────────┤
│  Pricing Demo (Platform revenue breakdown)                      │
├─────────────────────────────────────────────────────────────────┤
│  Footer                                                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Implementation Tasks

### 1. RTL & Hebrew Font Setup

**Files:** `index.html`, `src/index.css`

- Update `index.html`:
  - Set `lang="he"` and `dir="rtl"` on `<html>` tag
  - Update `<title>` to "2Tusk - שירותי בית מקצועיים"
  - Add Google Fonts link for "Heebo" Hebrew font

- Update `src/index.css`:
  - Add Heebo font-family to body
  - Add RTL-friendly utility classes if needed

---

### 2. Create Landing Page Components

**New Components to Create:**

| Component | Purpose |
|-----------|---------|
| `Navbar.tsx` | 2Tusk branding, navigation links, CTA buttons |
| `HeroSection.tsx` | Main headline, subtext, Sign Up/Become Tasker CTAs |
| `HowItWorks.tsx` | 3-step process with icons |
| `CategoriesGrid.tsx` | 6 service category cards |
| `TrustSafety.tsx` | Trust points with icons |
| `PricingDemo.tsx` | Platform revenue breakdown (user/pro/platform) |
| `Footer.tsx` | Simple footer with branding |
| `AIQuoteSection.tsx` | Wrapper for the chat + pro summary (existing logic) |

---

### 3. Navbar Component

**File:** `src/components/Navbar.tsx`

```text
┌──────────────────────────────────────────────────────────────┐
│  [CTA Buttons]     [Navigation Links]           [2Tusk Logo] │
│  הירשם | הפוך לבעל מקצוע      איך זה עובד | קטגוריות           │
└──────────────────────────────────────────────────────────────┘
```

- Logo on right (RTL)
- Navigation links in center
- CTAs on left

---

### 4. Hero Section Component

**File:** `src/components/HeroSection.tsx`

**Hebrew Content:**
- Headline: "בעל מקצוע לכל עבודה בבית. מהיר, אמין, ובמחיר מיידי"
- Subtext: "תאר את הבעיה, קבל הצעת מחיר מיידית מהבינה המלאכותית שלנו, והזמן בעל מקצוע מאומת תוך דקות"
- CTA 1: "הירשם" (Sign Up)
- CTA 2: "הפוך לבעל מקצוע" (Become a Tasker)
- Micro-text: "ללא התחייבות. לוקח פחות מדקה"

---

### 5. How It Works Component

**File:** `src/components/HowItWorks.tsx`

**3 Steps (Hebrew):**
1. "ספר לנו מה אתה צריך" - AI מבין את הבעיה מיד
2. "קבל הצעת מחיר מיידית" - מבוסס על נתוני שוק אמיתיים
3. "הזמן בעל מקצוע מאומת" - התאמה לבעלי מקצוע אמינים

---

### 6. Categories Grid Component

**File:** `src/components/CategoriesGrid.tsx`

**6 Categories (Hebrew):**
- 📺 תליית טלוויזיה (TV hanging)
- 🔧 אינסטלציה (Plumbing)
- ❄️ התקנת מזגן (AC installation)
- ⚡ עבודות חשמל (Electrical work)
- 🪑 הרכבת רהיטים (Furniture assembly)
- 🔌 מכשירי חשמל (Appliances)

---

### 7. Trust & Safety Component

**File:** `src/components/TrustSafety.tsx`

**Title:** "למה אלפים סומכים עלינו לשירותי בית"

**4 Trust Points:**
- ✅ בעלי מקצוע מאומתים
- 💳 תשלום רק לאחר סיום העבודה
- 🔒 הצפנה מאובטחת
- 📞 תמיכה מלאה

---

### 8. Pricing Demo Component

**File:** `src/components/PricingDemo.tsx`

**Interactive Demo showing:**

```text
┌─────────────────────────────────────────────────────────────┐
│                  איך המחירים עובדים?                         │
├───────────────────────┬─────────────────────────────────────┤
│     צד הלקוח          │           צד בעל המקצוע              │
├───────────────────────┼─────────────────────────────────────┤
│  מחיר בסיס: ₪100      │  ערך העבודה: ₪100                   │
│  עמלת שירות (10%):    │  עמלת פלטפורמה (10%): -₪10          │
│  ₪10                  │                                     │
│  ─────────────────    │  ─────────────────────              │
│  סה"כ לתשלום: ₪110    │  תשלום נטו: ₪90                     │
└───────────────────────┴─────────────────────────────────────┘
│           הכנסת 2Tusk: ₪20 (20% לכל עבודה של ₪100)          │
└─────────────────────────────────────────────────────────────┘
```

---

### 9. AI Quote Section Component

**File:** `src/components/AIQuoteSection.tsx`

- Wrap existing chat + pro summary functionality
- Move the current `Index.tsx` chat logic into this component
- Keep the 2/3 - 1/3 layout for user chat and pro summary

---

### 10. Update Landing Page (Index.tsx)

**File:** `src/pages/Index.tsx`

- Import all new components
- Compose the full landing page layout
- Add scroll-to functionality for CTA buttons
- Structure:

```tsx
<div dir="rtl" className="font-heebo">
  <Navbar />
  <HeroSection />
  <AIQuoteSection /> {/* Existing chat functionality */}
  <HowItWorks />
  <CategoriesGrid />
  <TrustSafety />
  <PricingDemo />
  <Footer />
</div>
```

---

### 11. Footer Component

**File:** `src/components/Footer.tsx`

- 2Tusk branding
- Copyright text
- Simple, minimalist design

---

## Technical Details

### File Changes Summary

| Action | File |
|--------|------|
| Modify | `index.html` - RTL, Hebrew lang, Heebo font |
| Modify | `src/index.css` - Font family, RTL utilities |
| Create | `src/components/Navbar.tsx` |
| Create | `src/components/HeroSection.tsx` |
| Create | `src/components/HowItWorks.tsx` |
| Create | `src/components/CategoriesGrid.tsx` |
| Create | `src/components/TrustSafety.tsx` |
| Create | `src/components/PricingDemo.tsx` |
| Create | `src/components/AIQuoteSection.tsx` |
| Create | `src/components/Footer.tsx` |
| Modify | `src/pages/Index.tsx` - Compose landing page |

### Design System
- Font: Heebo (Google Fonts)
- Colors: Use existing Shadcn theme (minimal, professional)
- Icons: Lucide React (already installed)
- Components: Shadcn UI (Card, Button, etc.)

### No Database Changes
This is a mockup - no data persistence needed. The existing chat functionality with the backend agent will continue to work as-is.

