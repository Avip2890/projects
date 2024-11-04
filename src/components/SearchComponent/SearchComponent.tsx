// SearchComponent.tsx
import React, {useState} from "react";
import {Students} from "../../interfaces/Student-interface";
import {Course} from "../../interfaces/Course-interface";
import {TextField, Button} from "@mui/material";
import './SearchComponent.css';

interface SearchFilterProps {
    students: Students[];
    courses: Course[];
    onFilterStudents: (filteredStudents: Students[]) => void;
    onFilterCourses: (filteredCourses: Course[]) => void;
}

const SearchFilterComponent = ({students, courses, onFilterStudents, onFilterCourses}: SearchFilterProps) => {
    const [studentSearchTerm, setStudentSearchTerm] = useState('');
    const [courseSearchTerm, setCourseSearchTerm] = useState('');

    const handleStudentSearch = () => {
        const filteredStudents = students.filter(student =>
            student.name.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
            student.city.toLowerCase().includes(studentSearchTerm.toLowerCase())
        );
        onFilterStudents(filteredStudents);
    };

    const handleCourseSearch = () => {
        const filteredCourses = courses.filter(course =>
            course.title.toLowerCase().includes(courseSearchTerm.toLowerCase())
        );
        onFilterCourses(filteredCourses);
    };

    return (
        <div className="search-filter">
            <TextField
                label="Search Students"
                variant="outlined"
                value={studentSearchTerm}
                onChange={(e) => setStudentSearchTerm(e.target.value)}
            />
            <Button onClick={handleStudentSearch} variant="contained" color="primary">
                Search Students
            </Button>

            <TextField
                label="Search Courses"
                variant="outlined"
                value={courseSearchTerm}
                onChange={(e) => setCourseSearchTerm(e.target.value)}
            />
            <Button onClick={handleCourseSearch} variant="contained" color="primary">
                Search Courses
            </Button>
        </div>
    );
};

export default SearchFilterComponent;
