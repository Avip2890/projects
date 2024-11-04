import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/NavBarComponent/NavBarComponents";
import HomePage from "./Pages/HomePage/HomePage";
import CoursesComponent from "./CoursesComponent/CoursesComponent";
import StudentsComponent from "./components/StudentComponent/StudentsComponent";
import EnrollmentsComponent from "./components/EnrollmentsComponent/EnrollmentsComponent";
import Login from "./components/LoginComponent/LoginComponent";
import useStore from "./store/storeState";
import AdminPage from "./Pages/AdminPage/AdminPage";
import ProtectedRoute from "./protectedRoutes/protectedRoutes";
import SignInComponent from "./components/SignInComponent/SignInComponent";
import {AuthProvider} from "./Context/AuthContext"; // ייבוא ה-AuthProvider מהקונטקסט

const App = () => {
    const { students } = useStore();
    const { courses } = useStore();

    return (
        <AuthProvider>
            <Navbar />
            <Routes>
                <Route path="*" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-in" element={<SignInComponent />} />
                <Route
                    path="/courses"
                    element={
                        <ProtectedRoute>
                            <CoursesComponent courses={courses} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/students"
                    element={
                        <ProtectedRoute>
                            <StudentsComponent students={students} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/enrollments"
                    element={
                        <ProtectedRoute>
                            <EnrollmentsComponent />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
};

export default App;
