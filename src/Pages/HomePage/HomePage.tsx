import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box } from '@mui/material';
import { programmingCourses } from "../../data/courses";
import './HomePage.css';
import {useAuth} from "../../Context/AuthContext";

const HomePage = () => {
    const { currentUser } = useAuth(); // קבלת המשתמש הנוכחי מה-context
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [selectedCourse, setSelectedCourse] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // כאן ניתן להוסיף את ההיגיון להוספת סטודנט וההרשמה שלו לקורס
        setName('');
        setEmail('');
        setCity('');
        setSelectedCourse('');
    };

    // נבדוק אם המשתמש הנוכחי מחובר ובתפקיד 'student'
    const isFormEnabled = currentUser?.role === 'student';

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ marginTop: 4 }}
        >
            <Typography variant="h4" gutterBottom>
                Student Registration
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
                <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                    disabled={!isFormEnabled} // יהפוך את השדה ל-disabled אם המשתמש אינו סטודנט מחובר
                />
                <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    disabled={!isFormEnabled}
                />
                <TextField
                    fullWidth
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    margin="normal"
                    disabled={!isFormEnabled}
                />
                <TextField
                    select
                    fullWidth
                    label="Select Course"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    margin="normal"
                    disabled={!isFormEnabled}
                >
                    {programmingCourses.map((course) => (
                        <MenuItem key={course.id} value={course.id}>
                            {course.title}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!isFormEnabled} // יהפוך את הכפתור ל-disabled אם המשתמש אינו סטודנט מחובר
                >
                    Register
                </Button>
            </Box>
        </Box>
    );
};

export default HomePage;
