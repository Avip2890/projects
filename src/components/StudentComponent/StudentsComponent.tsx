import useStore from "../../store/storeState";
import React, {useEffect, useState} from "react";
import {Students} from "../../interfaces/Student-interface";
import {
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";

const StudentsComponent = () => {
    const {students, addStudent, updateStudent, removeStudent} = useStore();
    const [editingStudent, setEditingStudent] = useState<Students | null>(null);
    const [studentName, setStudentName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [studentCity, setStudentCity] = useState('');
    const [studentEnrollmentDate, setStudentEnrollmentDate] = useState<Date | null>(null);

    useEffect(() => {
        if (editingStudent) {
            setStudentName(editingStudent.name);
            setStudentEmail(editingStudent.email);
            setStudentCity(editingStudent.city);
            setStudentEnrollmentDate(editingStudent.enrollmentDate);
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
            setEditingStudent(null);
        } else {

            addStudent(student);
        }


        resetForm();
    };


    const resetForm = () => {
        setStudentName('');
        setStudentEmail('');
        setStudentCity('');
        setStudentEnrollmentDate(new Date());
    };


    return (
        <div>
            <h1>Student Management</h1>
            <form onSubmit={handleSubmit} className="student-form">
                <TextField
                    label="Name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                    variant="outlined"
                    className="student-input"
                />
                <TextField
                    label="Email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    required
                    variant="outlined"
                    className="student-input"
                />
                <TextField
                    label="City"
                    value={studentCity}
                    onChange={(e) => setStudentCity(e.target.value)}
                    required
                    variant="outlined"
                    className="student-input"
                />
                <TextField
                    label="Enrollment Date"
                    type="date"
                    value={studentEnrollmentDate ? studentEnrollmentDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => setStudentEnrollmentDate(new Date(e.target.value))}
                    InputLabelProps={{shrink: true}}
                    variant="outlined"
                    className="student-input"
                />
                <Button type="submit" variant="contained" color="primary">
                    {editingStudent ? 'Update' : 'Add'}
                </Button>
            </form>
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
                                        className="action-button"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            if (student.id) {
                                                removeStudent(student.id);
                                            }
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

export default StudentsComponent;

