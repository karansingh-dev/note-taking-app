import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type signInData } from '../../validation/userSchema';
import { toast } from "react-hot-toast";
import { useState } from 'react';
import BasicLoader from '../../components/atoms/basic-loader';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { OrSeparator } from '../../components/atoms/or-separator';
import { handleGoogleSignIn } from '../../action/google-signin';
import { useUser } from '../../context/userContext';


export default function SignIn() {

    const {setToken} = useUser();

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [otpError, setOtpError] = useState<string>("");
    const [otp, setOtp] = useState<string>("");

    const { register, handleSubmit, formState: { errors }, watch } = useForm<signInData>({
        resolver: zodResolver(signInSchema),
    });

    const email = watch("email");

    const onSubmit: SubmitHandler<signInData> = async (data) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/user/signin-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            if (result.success) {
                toast.success(result.message);
                setOtpSent(true);
            } else {
                toast.error(result.message || "Failed to send OTP");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const OTP_REGEX = /^\d{6}$/;

    const handleLogin = async () => {
        if (!otp || !OTP_REGEX.test(otp)) {
            setOtpError("Please enter Valid OTP");
            return;
        }
        setLoading(true);
        try {
            const data = { otp, email };
            const res = await fetch(`http://localhost:5000/api/user/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            if (result.success) {
                toast.success(result.message);
                localStorage.setItem("token", result.data.jwt);
                setToken(result.data.jwt);
                navigate("/dashboard")
            } else {
                toast.error(result.message || "Invalid OTP");
            }
        } catch (err) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white ">
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

                {/* form  */}
                <div className='flex justify-center flex-col items-center gap-2 p-6'>
                    <form onSubmit={handleSubmit(onSubmit)} id='signUp' className='relative space-y-4 w-full max-w-md'>

                        <div className="text-center md:text-left relative">
                            {/* Logo */}
                            <div className="flex gap-2 items-center justify-center md:justify-start md:absolute md:-top-42 md:-left-35">
                                <Loader className="text-blue-600" />
                                <span className="text-lg">HD</span>
                            </div>


                            <div className="md:pt-8">
                                <h1 className="text-4xl font-semibold">Sign in</h1>
                                <p className="text-gray-500 mt-1 text-sm">
                                    Please login to continue to your account
                                </p>
                            </div>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <TextField
                                disabled={otpSent}
                                label="Email"
                                variant="outlined"
                                {...register("email")}
                            />
                            {errors.email && <p className='text-rose-500'>{errors.email.message}</p>}

                            {otpSent && (
                                <TextField
                                    disabled={loading}
                                    label="OTP"
                                    variant="outlined"
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            )}

                            {otpSent && <button onClick={handleSubmit(onSubmit)} className='underline text-blue-500 text-sm'>

                                Resend Otp

                            </button>}
                            {otpError && <p className='text-rose-500'>{otpError}</p>}
                        </div>

                        <div>
                            {otpSent ? (
                                <Button
                                    variant='contained'
                                    className='w-full'
                                    onClick={handleLogin}
                                    disabled={loading}
                                >
                                    {loading ? <BasicLoader /> : "Sign In"}
                                </Button>
                            ) : (
                                <Button
                                    type='submit'
                                    variant='contained'
                                    className='w-full'
                                    disabled={loading}
                                >
                                    {loading ? <BasicLoader /> : "Get OTP"}
                                </Button>
                            )}
                        </div>
                        <OrSeparator />
                        <Button
                            variant='outlined'
                            disabled={otpSent}
                            onClick={handleGoogleSignIn}
                            className=" text-white font-medium w-full flex items-center gap-2"
                        >
                            <img
                                src="https://developers.google.com/identity/images/g-logo.png"
                                alt="Google logo"
                                className="w-5 h-5"
                            />
                            Sign in with Google
                        </Button>
                    </form>

                    <div className='text-sm font-normal mt-3'>
                        Need an Account?{" "}
                        <a className='text-blue-500 underline' href="/signup">Create one</a>
                    </div>
                </div>

                {/* image  */}
                <div className='hidden md:flex justify-center items-center min-h-screen'>
                    <img
                        src='/image.jpg'
                        alt='image'
                        className='w-full rounded-md  h-full object-cover'
                    />
                </div>
            </div>
        </div>
    );
}
