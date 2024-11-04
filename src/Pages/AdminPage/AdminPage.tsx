import React, { useState } from 'react';
import {
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'student';
}

const AdminPage = () => {
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'User One', email: 'userone@example.com', role: 'student' },
        { id: 2, name: 'Admin', email: 'admin@example.com', role: 'admin' },
        { id: 3, name: 'User Three', email: 'userthree@example.com', role: 'student' },
    ]);

    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [newUser, setNewUser] = useState<User>({ id: 0, name: '', email: '', role: 'student' });

    const handleClickOpen = () => {
        setEditMode(false);
        setNewUser({ id: 0, name: '', email: '', role: 'student' });
        setOpen(true);
    };

    const handleEditOpen = (user: User) => {
        setEditMode(true);
        setCurrentUser(user);
        setNewUser({ ...user });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        if (editMode) {
            // עדכון משתמש קיים
            setUsers(users.map(user => (user.id === currentUser?.id ? newUser : user)));
        } else {
            // הוספת משתמש חדש
            setUsers([...users, { ...newUser, id: users.length + 1 }]);
        }
        handleClose();
    };

    const handleDelete = (userId: number) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>
            <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleClickOpen}>
                Add New User
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="secondary" sx={{ mr: 1 }} onClick={() => handleEditOpen(user)}>
                                        Edit
                                    </Button>
                                    <Button variant="outlined" color="error" onClick={() => handleDelete(user.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? 'Edit User' : 'Add User'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {editMode ? 'Edit user details:' : 'Enter user details:'}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'student' })}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="student">Student</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>{editMode ? 'Update' : 'Add'}</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AdminPage;
