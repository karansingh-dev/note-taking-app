
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "react-hot-toast";
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useUser } from "../../../../context/userContext";
import { signInSchema, type signInData } from "../../../../validation/userSchema";
import { apiCall } from "../../../../utils/api";



export const useSignin = ()=>{
    const { setToken } = useUser();

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
            const res = await apiCall<null, signInData>("/user/signin-otp", "POST", "noauth", data);

            if (res.success) {
                toast.success(res.message);
                setOtpSent(true);
            } else {
                toast.error(res.message || "Failed to send OTP");
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

            const res = await apiCall<string, typeof data>("/user/signin", "POST", "noauth", data);

            if (res.success) {
                toast.success(res.message);
                localStorage.setItem("token", res.data);
                setToken(res.data);
                navigate("/dashboard")
            } else {
                toast.error(res.message || "Invalid OTP");
            }
        } catch (err) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };


    return {
    // form
    register,
    handleSubmit,
    errors,
    onSubmit,

    // otp
    otp,
    setOtp,
    otpError,
    otpSent,
    handleLogin,

    // state
    loading,
  };

}