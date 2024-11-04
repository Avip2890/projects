import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
    uid: string;
    email: string;

    role: 'admin' | 'student';
    course?: string;
    password?: string;
}

interface AuthContextType {
    currentUser: User | null;
    login: (email: string, password: string) => User | null;
    logout: () => void;
    addAdmin: (email: string) => void;
    register: (email: string, password: string, role: 'admin' | 'student', course?: string) => User | null;
    admins: User[];
    users: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const HARDCODED_ADMIN: User = {
    uid: '1',
    email: 'admin@admin.com',
    password: 'admin1',
    role: 'admin',
};

const HARDCODED_USERS: User[] = [
    { uid: '2', email: 'student@user.com', password: 'student', role: 'student' },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("currentUser");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [admins, setAdmins] = useState<User[]>([HARDCODED_ADMIN]);
    const [users, setUsers] = useState<User[]>([...HARDCODED_USERS]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("currentUser");
        }
    }, [currentUser]);

    const register = (email: string, password: string, role: 'admin' | 'student', course?: string): User | null => {
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            console.error("User with this email already exists");
            return null;
        }

        const newUser: User = {
            uid: Date.now().toString(),
            email,
            password,
            role,
            course,
        };

        if (role === 'admin') {
            setAdmins(prevAdmins => [...prevAdmins, newUser]);
        } else {
            setUsers(prevUsers => [...prevUsers, newUser]);
        }
        setCurrentUser(newUser);

        return newUser;
    };

    const login = (email: string, password: string): User | null => {
        const user = [...admins, ...users].find(user => user.email === email && user.password === password);
        if (user) {
            setCurrentUser(user);
            console.log(`Logged in as: ${user.email}`);
            return user;
        } else {
            console.error("Invalid email or password");
            return null;
        }
    };

    const logout = () => {
        setCurrentUser(null);
        console.log("Logged out");
    };

    const addAdmin = (email: string) => {
        if (!admins.find(admin => admin.email === email)) {
            const newAdmin: User = { uid: Date.now().toString(), email, role: 'admin' };
            setAdmins(prevAdmins => [...prevAdmins, newAdmin]);
            console.log(`New admin added: ${email}`);
        } else {
            console.log(`Admin with email ${email} already exists`);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, addAdmin, register, admins, users }}>
            {children}
        </AuthContext.Provider>
    );
};
