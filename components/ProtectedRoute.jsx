import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation

const ProtectedRoute = ({ isLoading, isLoggedIn, children, ...props }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            navigate("/auth");
        }
    }, [isLoading, isLoggedIn, navigate]);

    if (isLoading) {
        return null;
    }

    return React.cloneElement(children, { ...props });
};

export default ProtectedRoute;
