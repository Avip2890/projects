export interface User {
    uid: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'student';
    course: string; // Add this line
}
