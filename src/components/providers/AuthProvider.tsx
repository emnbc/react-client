import React from "react";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  birthDate: string;
  avatar: string;
  isActive: boolean;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  user: User;
  logIn: (userData: User) => void;
  logOut: () => void;
}

export let AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setLoginState] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User>(null!);

  const logIn = (userData: User) => {
    setUser(userData);
    setLoginState(true);
  };

  const logOut = () => {
    setUser(null!);
    setLoginState(false);
  };

  const value = {
    isLoggedIn,
    user,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
