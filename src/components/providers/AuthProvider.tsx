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
  updateLogin: (userData: User) => void;
}

export let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setLoginState] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User>(null!);

  const updateLogin = (userData: User) => {
    setUser(userData);
    setLoginState(true);
  };

  const value = {
    isLoggedIn,
    user,
    updateLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return React.useContext(AuthContext);
}
