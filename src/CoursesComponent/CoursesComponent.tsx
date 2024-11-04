import React, { useEffect, useState } from "react";
import { Course } from '../interfaces/Course-interface';
import useStore from "../store/storeState";

import {
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import {useAuth} from "../Context/AuthContext";

interface CoursesComponentProps {
    courses: Course[];
}

const CoursesComponent = ({ courses }: CoursesComponentProps) => {
    const { addCourse, updateCourse, removeCourse } = useStore();
    const { currentUser } = useAuth();

    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseHours, setCourseHours] = useState<number>(0);
    const [coursePrice, setCoursePrice] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [snackbar, setSnackbar] = useState({ isOpen: false, message: '', severity: 'info' as 'success' | 'error' });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    useEffect(() => {
        if (editingCourse) {
            setFormData(editingCourse);
        } else {
            resetForm();
        }
    }, [editingCourse]);

    const setFormData = (course: Course) => {
        setCourseTitle(course.title);
        setCourseDescription(course.description);
        setCourseHours(course.hours);
        setCoursePrice(course.price);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const course: Omit<Course, 'id'> = {
            title: courseTitle,
            description: courseDescription,
            hours: courseHours,
            price: coursePrice,
        };

        if (editingCourse) {
            await updateCourse(editingCourse.id, course);
            showSnackbar('Course updated successfully!', 'success');
            setEditingCourse(null);
        } else {
            await addCourse({ id: generateRandomId(), ...course });
            showSnackbar('Course added successfully!', 'success');
        }

        resetForm();
        handleCloseDialog();
    };

    const validateForm = () => {
        if (!courseTitle || !courseDescription || courseHours <= 0 || coursePrice <= 0) {
            showSnackbar('All fields are required and must be valid!', 'error');
            return false;
        }
        return true;
    };

    const handleRemoveCourse = async () => {
        if (editingCourse && confirmDeleteOpen) {
            await removeCourse(editingCourse.id);
            showSnackbar('Course removed successfully!', 'success');
            setConfirmDeleteOpen(false);
            setEditingCourse(null);
        }
    };

    const resetForm = () => {
        setCourseTitle('');
        setCourseDescription('');
        setCourseHours(0);
        setCoursePrice(0);
    };

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbar({ isOpen: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, isOpen: false });
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setEditingCourse(null);
    };

    const openDialog = (course?: Course) => {
        setEditingCourse(course || null);
        setDialogOpen(true);
    };

    const openConfirmDeleteDialog = (course: Course) => {
        setEditingCourse(course);
        setConfirmDeleteOpen(true);
    };

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Course Management</h1>

            <Button variant="contained" color="primary" onClick={() => openDialog()}>
                Add Course
            </Button>

            <TextField
                placeholder="Search Courses..."
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

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
                        {filteredCourses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell>{course.title}</TableCell>
                                <TableCell>{course.description}</TableCell>
                                <TableCell>{course.hours}</TableCell>
                                <TableCell>{course.price}</TableCell>
                                <TableCell>
                                    <>
                                        <Button
                                            onClick={() => openDialog(course)}
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => openConfirmDeleteDialog(course)}
                                            variant="outlined"
                                            color="secondary"
                                        >
                                            Delete
                                        </Button>
                                    </>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar
                open={snackbar.isOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{editingCourse ? 'Edit Course' : 'Add Course'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Course Title"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        required
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Course Description"
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        required
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Course Hours"
                        type="number"
                        value={courseHours}
                        onChange={(e) => setCourseHours(Number(e.target.value))}
                        required
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Course Price"
                        type="number"
                        value={coursePrice}
                        onChange={(e) => setCoursePrice(Number(e.target.value))}
                        required
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        {editingCourse ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this course: {editingCourse?.title}?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleRemoveCourse} variant="contained" color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CoursesComponent;

const generateRandomId = () => Math.random().toString(36).substr(2, 9);
