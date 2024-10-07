import React, { useEffect, useState } from "react";
import { Course } from '../interfaces/Course-interface';
import useStore from "../store/storeState";
import {TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,} from "@mui/material";

const CoursesComponent = () => {
    const { courses, addCourse, updateCourse, removeCourse } = useStore();
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseHours, setCourseHours] = useState<number>(0);
    const [coursePrice, setCoursePrice] = useState<number>(0);

    useEffect(() => {
        if (editingCourse) {
            setCourseTitle(editingCourse.title);
            setCourseDescription(editingCourse.description);
            setCourseHours(editingCourse.hours);
            setCoursePrice(editingCourse.price);
        } else {
            resetForm();
        }
    }, [editingCourse]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const course: Omit<Course, 'id'> = {
            title: courseTitle,
            description: courseDescription,
            hours: courseHours,
            price: coursePrice,
        };

        if (editingCourse && editingCourse.id) {
            updateCourse(editingCourse.id, course);
            setEditingCourse(null);
        } else {
            addCourse({ id: generateRandomId(), ...course }); // הוספת ID אקראי
        }

        resetForm();
    };

    const resetForm = () => {
        setCourseTitle('');
        setCourseDescription('');
        setCourseHours(0);
        setCoursePrice(0);
    };

    return (
        <div>
            <h1>Course Management</h1>
            <form onSubmit={handleSubmit} className="course-form">
                <TextField
                    label="Course Title"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    required
                    variant="outlined"
                    className="course-input"
                />
                <TextField
                    label="Course Description"
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    required
                    variant="outlined"
                    className="course-input"
                />
                <TextField
                    label="Course Hours"
                    type="number"
                    value={courseHours}
                    onChange={(e) => setCourseHours(Number(e.target.value))}
                    required
                    variant="outlined"
                    className="course-input"
                />
                <TextField
                    label="Course Price"
                    type="number"
                    value={coursePrice}
                    onChange={(e) => setCoursePrice(Number(e.target.value))}
                    required
                    variant="outlined"
                    className="course-input"
                />
                <Button type="submit" variant="contained" color="primary">
                    {editingCourse ? 'Update' : 'Add'}
                </Button>
            </form>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Hours</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell>{course.title}</TableCell>
                                <TableCell>{course.description}</TableCell>
                                <TableCell>{course.hours}</TableCell>
                                <TableCell>{course.price}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => setEditingCourse(course)}
                                        variant="outlined"
                                        color="primary"
                                        className="action-button"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            removeCourse(course.id);
                                        }}
                                        variant="outlined"
                                        color="secondary"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CoursesComponent;

// פונקציה ליצירת ID אקראי
const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 8); // מייצר מחרוזת אקראית באורך 8
};
