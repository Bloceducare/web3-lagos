import React, { createContext, useState, ReactNode, FC } from 'react';


// Define the shape of the context value
interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebarcollapse: () => void;
}

// Initial value with default types
const initialValue: SidebarContextType = {
  isCollapsed: false,
  toggleSidebarcollapse: () => {}, // This will be overridden by the actual function
};

// Create the context with the specified type
const SidebarContext = createContext<SidebarContextType>(initialValue);

// Define the provider component
const SidebarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isCollapsed, setCollapse] = useState<boolean>(false);

  const toggleSidebarcollapse = () => {
    setCollapse((prevState) => !prevState);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebarcollapse }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
