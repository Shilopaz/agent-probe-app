import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  street: string;
  houseNumber: string;
  floor: string;
  apartment: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  phoneNumber: string;
  profile: Profile | null;
  loginMethod: 'phone' | 'google' | 'apple' | null;
  setPhoneNumber: (phone: string) => void;
  setProfile: (profile: Profile) => void;
  login: (method: 'phone' | 'google' | 'apple') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loginMethod, setLoginMethod] = useState<'phone' | 'google' | 'apple' | null>(null);

  const login = (method: 'phone' | 'google' | 'apple') => {
    setLoginMethod(method);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setPhoneNumber('');
    setProfile(null);
    setLoginMethod(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        phoneNumber,
        profile,
        loginMethod,
        setPhoneNumber,
        setProfile,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
