

import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import LoadingScreen from "../../components/atoms/loading-screen";

const ProtectedRoutes = () => {
    const { user, isLoading } = useUser();

    if (isLoading) return <LoadingScreen />;

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    if (!user.isRegistered && location.pathname !== "/signup") {
        return <Navigate to="/signup" replace />;
    }


    return <Outlet />;
};

export default ProtectedRoutes;