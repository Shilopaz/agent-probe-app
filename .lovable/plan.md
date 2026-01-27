
# Signup Flow Implementation Plan

## Overview
Implement a complete signup flow for 2Tusk with phone/OTP authentication and social login options (Google, Apple), followed by profile creation and a logged-in lobby view.

## User Flow Diagram
```text
+------------------+     +------------------+     +------------------+     +------------------+
|   Landing Page   | --> |   Signup Page    | --> |   OTP Page       | --> |  Profile Page    |
| (Click "הירשם")  |     | Phone/Google/    |     | 6-digit code     |     | Name, Address,   |
|                  |     | Apple            |     |                  |     | Email            |
+------------------+     +------------------+     +------------------+     +------------------+
                                                                                     |
                                                                                     v
                                                                          +------------------+
                                                                          |  Logged-in Lobby |
                                                                          |  (Dashboard)     |
                                                                          +------------------+
```

## Implementation Steps

### Step 1: Create Auth Context
Create a simple auth context to manage user state across the signup flow without real authentication.

**New File:** `src/contexts/AuthContext.tsx`
- Store user phone number, profile data, and login status
- Provide methods to update state through signup steps
- Track current step in the signup flow

### Step 2: Create Signup Page
**New File:** `src/pages/Signup.tsx`
- Phone number input field
- "המשך" (Continue) button to proceed to OTP
- Divider with "או" (or)
- Google signup button
- Apple signup button
- Clicking Google/Apple directly marks user as logged in and redirects to lobby

### Step 3: Create OTP Verification Page
**New File:** `src/pages/OTPVerification.tsx`
- Title: "הזן את הקוד שנשלח אליך"
- 6 individual input boxes for OTP digits
- Auto-advance to next box when digit entered
- Accept any 6-digit code (mockup behavior)
- "אמת" (Verify) button to proceed to profile creation

### Step 4: Create Profile Creation Page
**New File:** `src/pages/CreateProfile.tsx`
- Form fields (all required):
  - שם פרטי (First Name)
  - שם משפחה (Last Name)
  - מייל (Email)
  - עיר (City)
  - רחוב (Street)
  - מספר בית (House Number)
  - קומה (Floor)
  - דירה (Apartment)
- Validation with error alerts for empty fields
- "סיים הרשמה" (Complete Registration) button

### Step 5: Create Logged-in Lobby Page
**New File:** `src/pages/Lobby.tsx`
- Welcome message with user's name
- Simple dashboard layout
- Logout option to return to landing page

### Step 6: Update Navigation Components
**Update:** `src/components/Navbar.tsx`
- Make "הירשם" button navigate to `/signup`
- Show different state when user is logged in

**Update:** `src/components/HeroSection.tsx`
- Make "הירשם" button navigate to `/signup`

### Step 7: Update App Router
**Update:** `src/App.tsx`
- Wrap app with AuthProvider
- Add routes:
  - `/signup` - Signup page
  - `/otp` - OTP verification
  - `/create-profile` - Profile creation
  - `/lobby` - Logged-in dashboard

## Files to Create
1. `src/contexts/AuthContext.tsx` - Auth state management
2. `src/pages/Signup.tsx` - Initial signup page
3. `src/pages/OTPVerification.tsx` - OTP verification page
4. `src/pages/CreateProfile.tsx` - Profile creation form
5. `src/pages/Lobby.tsx` - Logged-in lobby/dashboard

## Files to Modify
1. `src/App.tsx` - Add routes and AuthProvider
2. `src/components/Navbar.tsx` - Link signup button
3. `src/components/HeroSection.tsx` - Link signup button

## Technical Details

### Auth Context Structure
```text
AuthContext
├── isLoggedIn: boolean
├── phoneNumber: string
├── profile: { firstName, lastName, email, city, street, houseNumber, floor, apartment }
├── loginMethod: 'phone' | 'google' | 'apple' | null
├── setPhoneNumber()
├── setProfile()
├── login()
├── logout()
```

### OTP Component
Will use the existing `InputOTP` component from `src/components/ui/input-otp.tsx` which already has:
- Auto-focus behavior
- Individual slot styling
- RTL support

### Form Validation
Using Zod schema validation for profile fields:
- All fields required (non-empty strings)
- Email format validation
- Display inline error messages in Hebrew

### UI Components Used
- Card, CardHeader, CardContent from shadcn
- Button variants (default, outline)
- Input component
- InputOTP for 6-digit code
- Form validation with react-hook-form + zod
- Toast notifications for errors
