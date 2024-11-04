export interface SnackbarState {
    isOpen: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
}