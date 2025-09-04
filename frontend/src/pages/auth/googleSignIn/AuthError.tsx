import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthError() {
    const navigate = useNavigate();

    const handleTryAgain = () => {
        navigate('/signin');
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center max-w-md px-6">
                <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Authentication Failed
                </h1>

                <p className="text-gray-600 mb-8">
                    We encountered an error while signing you in with Google. Please try again.
                </p>

                <button
                    onClick={handleTryAgain}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}