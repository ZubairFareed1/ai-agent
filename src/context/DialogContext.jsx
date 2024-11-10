import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create Context
const DialogContext = createContext();

// Custom hook to use the context
export const useDialog = () => {
    return useContext(DialogContext);
};

// Provider component to wrap your app and provide context value
export const DialogProvider = ({ children }) => {
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);

    const handleLogoutClick = () => {
        setShowDialog(true); // Show the dialog
    };

    const handleConfirmLogout = () => {
        console.log("User logged out");
        setShowDialog(false); // Hide the dialog after logout
        navigate('/login');
    };

    const handleCancelLogout = () => {
        setShowDialog(false); // Hide the dialog on cancel
    };

    return (
        <DialogContext.Provider value={{ showDialog, handleLogoutClick, handleConfirmLogout, handleCancelLogout }}>
            {children}
        </DialogContext.Provider>
    );
};
