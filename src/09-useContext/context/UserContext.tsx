import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import { users, type User } from "../data/user-mock.data";

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

interface UserContextProps {
    authStatus: AuthStatus;
    user: User | null;
    isAuthenticated: boolean;

    login: (userId: number) => boolean;
    logout: () => void;
};

export const UserContext = createContext({} as UserContextProps);


export const UserContextProvider = ({ children }: PropsWithChildren) => {

    const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
    const [user, setUser] = useState<User | null>(null);

    const handleLogin = (userId: number) => {

        const user = users.find(user => user.id === userId);

        if (!user) {
            console.log('Usuario no encontrado: ', userId);
            setUser(null);
            setAuthStatus('not-authenticated');
            return false;
        }

        setUser(user);
        setAuthStatus('authenticated');
        localStorage.setItem('userId', userId.toString());
        console.log('Login usuario: ', user.id);
        return true;
    };

    const handleLogout = () => {
        console.log('Logout');
        setUser(null);
        setAuthStatus('not-authenticated');
        localStorage.removeItem('userId');
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');

        if (storedUserId) {
            handleLogin(Number(storedUserId));
            return;
        }

        handleLogout();
    }, []);

    return (
        <UserContext value={{
            authStatus: authStatus,
            isAuthenticated: authStatus === 'authenticated',
            user: user,

            login: handleLogin,
            logout: handleLogout,

        }} >
            {children}
        </UserContext>
    )
};
