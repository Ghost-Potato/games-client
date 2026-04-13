'use client';

//global var store using React Context Hook for client components like forms
import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
    //two global variables and two setters
    appUsername: string | null;
    setAppUsername: (username: string) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (authenticated: boolean) => void;
}

//create global container for global variables and setters
const AppContext = createContext<AppContextType | undefined>(undefined);

//create global provider to wrap all components as children
interface AppProviderProps {
    children: ReactNode;
}

//make global
export function AppProvider({ children }: AppProviderProps) {
    //initialize global variables and setters
    const[appUsername, setAppUsername] = useState<string | null>(null);
    const[isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const value: AppContextType = {
        //make public
        appUsername, setAppUsername, isAuthenticated, setIsAuthenticated
    };

    //create jsx wrapper around other components
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
};

//hook to let children use global variables and setters
export const useAppContext = () => {
    const context = useContext(AppContext);

    if(!context) throw new Error('Global context not found');
    return context;
}