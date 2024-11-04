import React from 'react';
import { Navigate } from 'react-router-dom';

import {useAuth} from "../Context/AuthContext";


interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { currentUser } = useAuth();

    // בדוק אם המשתמש מחובר ואם הוא מנהל
    if (!currentUser || currentUser.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
