
import React from 'react';
import useStore from "../../store/storeState";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import {programmingCourses} from "../../data/courses";


const Enrollments = () => {
    const enrollments = useStore((state) => state.enrollments);
    const students = useStore((state) => state.students);

    return (
        <TableContainer component={Paper}>
            <Typography variant="h4" gutterBottom style={{ padding: '16px' }}>
                Enrollments
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Student Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Course</TableCell>
                        <TableCell>Enrollment Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {enrollments.map((enrollment) => {
                        const student = students.find((s) => s.id === enrollment.studentId);
                        // Get the course title from programmingCourses using the courseId
                        const course = programmingCourses.find((c) => c.id === enrollment.courseId);

                        // Debugging output
                        console.log('Enrollment:', enrollment);
                        console.log('Student:', student);
                        console.log('Course ID:', enrollment.courseId);
                        console.log('Course:', course);

                        return (
                            <TableRow key={enrollment.id}>
                                <TableCell>{student ? student.name : 'Unknown'}</TableCell>
                                <TableCell>{student ? student.email : 'Unknown'}</TableCell>
                                <TableCell>{course ? course.title : 'Unknown'}</TableCell>
                                <TableCell>{enrollment.enrollmentDate.toString()}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Enrollments;
