import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';

const container = document.getElementById('root');

// יצירת root והפעלת ה-App בתוכו
const root = ReactDOM.createRoot(container!);
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);
