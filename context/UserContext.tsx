"use client";

import { createContext, useContext } from "react";

interface UserContextType {
  userInfo: any;
  setUserInfo: (data: any) => void;
}

const UserContext = createContext<UserContextType>({
  userInfo: null,
  setUserInfo: () => {},
});

export const useUserInfo = () => useContext(UserContext);

export const UserProvider: React.FC<{
  value: UserContextType;
  children: React.ReactNode;
}> = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
