import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BasicLoader from "../../components/atoms/basic-loader";
import { useUser } from "../../context/userContext";

export default function AuthCallback() {

    const { setToken } = useUser();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {


            localStorage.setItem("token", token);
            setToken(token);


            navigate("/dashboard", { replace: true });
        } else {

            navigate("/login", { replace: true });
        }
    }, [searchParams, navigate]);

    return (
        <div className="flex items-center justify-center h-screen">
            <BasicLoader />
            <p className="text-lg font-medium">Authenticating...</p>
        </div>
    );
}
