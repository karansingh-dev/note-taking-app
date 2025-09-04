import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "react-hot-toast";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/userContext";
import { apiCall } from "../../../../utils/api";
import { type SignUpData, signUpSchema } from "../../../../validation/userSchema";

export const useSignup = () => {
  const { setToken } = useUser();

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const email = watch("email");

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    setLoading(true);
    try {
      const res = await apiCall<null, SignUpData>(
        "/user/signup-otp",
        "POST",
        "noauth",
        data
      );

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

  const handleRegister = async () => {
    if (!otp || !OTP_REGEX.test(otp)) {
      setOtpError("Please enter Valid OTP");
      return;
    }
    setLoading(true);
    try {
      const data = { otp, email };

      const res = await apiCall<string, typeof data>(
        "/user/signup",
        "POST",
        "noauth",
        data
      );

      if (res.success) {
        toast.success(res.message);
        localStorage.setItem("token", res.data);
        setToken(res.data);
        navigate("/dashboard");
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
    setValue,
    errors,
    onSubmit,

    // otp
    otp,
    setOtp,
    otpError,
    otpSent,
    handleRegister,

    // state
    loading,
  };
};
