import { createContext, useState } from "react";

export const UserContext = createContext();

// Utiliza um contexto para salvar o usuário durante o aplicativo
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}