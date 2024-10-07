import { Course } from '../interfaces/Course-interface';
import { Enrollments } from '../interfaces/Enrollment-interface';
import { Students } from '../interfaces/Student-interface';
import { create } from 'zustand';

interface StoreState {
    courses: Course[];
    enrollments: Enrollments[];
    students: Students[];
    enrolledCourses: { [studentId: string]: string[] };
    addCourse: (course: Course) => void;
    updateCourse: (id: string, updatedCourse: Partial<Course>) => void;
    removeCourse: (id: string) => void;
    addStudent: (student: Omit<Students, 'id'>) => void;
    updateStudent: (id: string, updatedStudent: Partial<Students>) => void;
    removeStudent: (id: string) => void;
    enrollStudent: (enrollment: Enrollments) => void;
    removeEnrollment: (id: number) => void;
}

const useStore = create<StoreState>((set) => {

    const generateRandomId = () => {
        return Math.random().toString(36).substr(2, 8);
    };

    return {
        courses: [],
        enrollments: [],
        students: [],
        enrolledCourses: {},

        // הוספת קורס
        addCourse: (course: Course) => set((state) => ({
            courses: [...state.courses, course],
        })),

        // עדכון קורס
        updateCourse: (id: string, updatedCourse: Partial<Course>) => set((state) => ({
            courses: state.courses.map((course) =>
                course.id === id ? { ...course, ...updatedCourse } : course
            ),
        })),

        // מחיקת קורס
        removeCourse: (id: string) => set((state) => ({
            courses: state.courses.filter((course) => course.id !== id),
        })),

        // הוספת סטודנט
        addStudent: (student: Omit<Students, 'id'>) => set((state) => {
            const studentWithId = { id: generateRandomId(), ...student }; // יצירת סטודנט עם ID אקראי
            return {
                students: [...state.students, studentWithId],
            };
        }),

        // עדכון סטודנט
        updateStudent: (id: string, updatedStudent: Partial<Students>) => set((state) => {
            console.log("Updating student in store:", id, updatedStudent);
            return {
                students: state.students.map((student) =>
                    student.id === id ? { ...student, ...updatedStudent } : student
                ),
            };
        }),

        // מחיקת סטודנט
        removeStudent: (id: string) => set((state) => ({
            students: state.students.filter((student) => student.id !== id),
        })),

        // רישום סטודנט לקורס (שיבוץ)
        enrollStudent: (enrollment: Enrollments) => set((state) => {
            const { studentId, courseId } = enrollment;

            // הוספת השיבוץ
            const newEnrollments = [...state.enrollments, enrollment];

            // הוספת הקורס לרשימת הקורסים של הסטודנט
            const updatedEnrolledCourses = {
                ...state.enrolledCourses,
                [studentId]: [...(state.enrolledCourses[studentId] || []), courseId],
            };

            return {
                enrollments: newEnrollments,
                enrolledCourses: updatedEnrolledCourses,
            };
        }),

        // מחיקת שיבוץ
        removeEnrollment: (id: number) => set((state) => ({
            enrollments: state.enrollments.filter((enrollment) => enrollment.id !== id),
        })),
    };
});

export default useStore;
