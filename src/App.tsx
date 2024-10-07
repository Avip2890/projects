import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/NavBarComponent/NavBarComponents";
import HomePage from "./components/Pages/HomePage/HomePage";
import CoursesComponent from "./CoursesComponent/CoursesComponent";
import StudentsComponent from "./components/StudentComponent/StudentsComponent";

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<CoursesComponent />} />
                <Route path="/students" element={<StudentsComponent />} />
            </Routes>
        </>
    );
};

export default App;
