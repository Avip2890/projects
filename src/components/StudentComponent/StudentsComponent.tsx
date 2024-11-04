import useStore from "../../store/storeState";
import React, { useEffect, useState } from "react";
import { Students } from "../../interfaces/Student-interface";
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
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

interface StudentsComponentProps {
    students: Students[];
}

const StudentsComponent = ({ students }: StudentsComponentProps) => {
    const { addStudent, updateStudent, removeStudent } = useStore();
    const [editingStudent, setEditingStudent] = useState<Students | null>(null);
    const [studentName, setStudentName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [studentCity, setStudentCity] = useState('');
    const [studentEnrollmentDate, setStudentEnrollmentDate] = useState<Date | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        if (editingStudent) {
            setStudentName(editingStudent.name);
            setStudentEmail(editingStudent.email);
            setStudentCity(editingStudent.city);
            setStudentEnrollmentDate(editingStudent.enrollmentDate);
            setDialogOpen(true);
        } else {
            resetForm();
        }
    }, [editingStudent]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const student: Omit<Students, 'id'> = {
            name: studentName,
            email: studentEmail,
            city: studentCity,
            enrollmentDate: studentEnrollmentDate || new Date(),
        };

        if (editingStudent && editingStudent.id) {
            updateStudent(editingStudent.id, student);
            setSnackbarMessage('Student updated successfully!');
            setSnackbarSeverity('success');
            setEditingStudent(null);
        } else {
            addStudent(student);
            setSnackbarMessage('Student added successfully!');
            setSnackbarSeverity('success');
        }

        setSnackbarOpen(true);
        setDialogOpen(false);
        resetForm();
    };

    const handleDelete = (id: string) => {
        removeStudent(id);
        setSnackbarMessage('Student removed successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
    };

    const resetForm = () => {
        setStudentName('');
        setStudentEmail('');
        setStudentCity('');
        setStudentEnrollmentDate(new Date());
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setEditingStudent(null);
        resetForm();
    };

    return (
        <div>
            <h1>Student Management</h1>
            <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
                Add Student
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Enrollment Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id || student.email}>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{student.city}</TableCell>
                                <TableCell>{student.enrollmentDate.toString()}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => setEditingStudent(student)}
                                        variant="outlined"
                                        color="primary"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(student.id || '')}
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


            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{editingStudent ? 'Edit Student' : 'Add Student'}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            label="Name"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            value={studentEmail}
                            onChange={(e) => setStudentEmail(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="City"
                            value={studentCity}
                            onChange={(e) => setStudentCity(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Enrollment Date"
                            type="date"
                            value={studentEnrollmentDate ? studentEnrollmentDate.toISOString().split('T')[0] : ''}
                            onChange={(e) => setStudentEnrollmentDate(new Date(e.target.value))}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            {editingStudent ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default StudentsComponent;
