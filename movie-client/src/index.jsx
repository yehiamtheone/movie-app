import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { AlertProvider } from './alertContext/AlertContext';
import {  QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter >
    <QueryClientProvider client={queryClient}>
    <AlertProvider>
    <AuthProvider>
    <Routes>
        <Route path="/*" element={<App />}/>
    </Routes>
        
    </AuthProvider>
    </AlertProvider>
    </QueryClientProvider>
    </BrowserRouter>
);



