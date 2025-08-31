import type { Request, Response } from "express";
import {
  type RegisterData,
  registerUserSchema,
  type signInData,
  signInSchema,
  type SignUpData,
  signUpSchema,
} from "../schema/userSchema.js";
import { validateBody } from "../utils/validateData.js";
import prisma from "../lib/prismaClient.js";
import { ApiError } from "../utils/apiError.js";
import { generateOtp } from "../utils/otp.js";
import { sendEmail } from "../utils/sendEmail.js";
import { renderTemplate } from "../utils/renderTemplate.js";
import { generateJwt } from "../utils/jwt.js";
import { api } from "../routes/router.js";

// Request OTP for SignUp (with all user data)
export const getOtpForSignUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const validatedData = validateBody<SignUpData>(signUpSchema, req.body);
  validatedData.email = validatedData.email.toLowerCase();

  // Check if user already exists and is registered
  const userExist = await prisma.user.findUnique({
    where: { email: validatedData.email },
    select: { isRegistered: true },
  });

  if (userExist?.isRegistered) {
    throw new ApiError(400, "User already exists", ["Email already in use"]);
  }

  // Generating otp
  const otp = generateOtp();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  // Store all signup data but not fully registered yet
  await prisma.user.upsert({
    where: { email: validatedData.email },
    update: {
      ...validatedData,
      verifyCode: otp,
      verifyCodeExpiresAt: otpExpiresAt,
    },
    create: {
      ...validatedData,
      verifyCode: otp,
      verifyCodeExpiresAt: otpExpiresAt,
      isRegistered: false, // Important: not registered yet
      authProvider: "email",
    },
  });

  // Rendering the html for email
  const html = renderTemplate("otp-email-template", {
    name: validatedData.name,
    otp,
  });

  await sendEmail(validatedData.email, "note-taking-app OTP", html);

  return res.json({
    success: true,
    message: "OTP sent successfully",
    data: { email: validatedData.email },
    error: null,
  });
};

// Verify OTP and Complete SignUp (only need email + otp)

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const validatedData = validateBody<RegisterData>(
    registerUserSchema,
    req.body
  );
  validatedData.email = validatedData.email.toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: validatedData.email },
    select: {
      id: true,
      email: true,
      isRegistered: true,
      verifyCode: true,
      verifyCodeExpiresAt: true,
      authProvider: true,
    },
  });

  if (!user || user.isRegistered || user.authProvider !== "email") {
    throw new ApiError(400, "Failed to register user", [
      "User does not exist or already registered",
    ]);
  }

  if (validatedData.otp !== user.verifyCode) {
    throw new ApiError(400, "Incorrect OTP", ["Wrong OTP provided"]);
  }

  if (user.verifyCodeExpiresAt && user.verifyCodeExpiresAt < new Date()) {
    throw new ApiError(400, "OTP expired", ["Please request a new OTP"]);
  }

  // Complete registration
  await prisma.user.update({
    where: { email: user.email },
    data: {
      isRegistered: true,
    },
  });

  const payload = {
    userId: user.id,
    isRegistered: true,
    email: user.email,
  };

  const jwt = generateJwt(payload);

  return res
    .json({
      success: true,
      message: "Sign up successful",
      data: jwt,
      error: null,
    })
    .status(201);
};

//  Request OTP for SignIn (only email needed)
export const getOtpForSignIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const validatedData = validateBody<signInData>(signInSchema, req.body);

  validatedData.email = validatedData.email.toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: validatedData.email },
    select: {
      isRegistered: true,
      id: true,
      name: true,
      authProvider: true,
    },
  });

  if (!user || !user.isRegistered) {
    throw new ApiError(400, "Failed to send OTP", [
      "Invalid email or user not registered with email",
    ]);
  }

  const otp = generateOtp();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.update({
    where: { email: validatedData.email },
    data: {
      verifyCode: otp,
      verifyCodeExpiresAt: otpExpiresAt,
    },
  });

  const html = renderTemplate("otp-email-template", {
    name: user.name,
    otp,
  });

  await sendEmail(validatedData.email, "note-taking-app OTP", html);

  return res.json({
    success: true,
    message: "OTP sent successfully",
    data: { email: validatedData.email },
    error: null,
  });
};

// Verify OTP and Complete SignIn (only need email + otp)
export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const validatedData = validateBody<RegisterData>(
    registerUserSchema,
    req.body
  );
  validatedData.email = validatedData.email.toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: validatedData.email },
    select: {
      id: true,
      email: true,
      isRegistered: true,
      verifyCode: true,
      verifyCodeExpiresAt: true,
      authProvider: true,
    },
  });

  if (!user || !user.isRegistered) {
    throw new ApiError(400, "Failed to sign in", [
      "User not found or not registered with email",
    ]);
  }

  if (validatedData.otp !== user.verifyCode) {
    throw new ApiError(400, "Incorrect OTP", ["Wrong OTP provided"]);
  }

  if (user.verifyCodeExpiresAt && user.verifyCodeExpiresAt < new Date()) {
    throw new ApiError(400, "OTP expired", ["Please request a new OTP"]);
  }

  const payload = {
    userId: user.id,
    isRegistered: user.isRegistered,
    email: user.email,
  };

  const jwt = generateJwt(payload);

  return res.json({
    success: true,
    message: "Sign in successful",
    data: jwt,
    error: null,
  });
};

export const getUserData = async (req: Request, res: Response) => {
  const userData = req.userData;

  const user = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
    select: {
      name: true,
      email: true,
      isRegistered: true,
    },
  });

  if (!user || !user.isRegistered)
    throw new ApiError(404, "User not found", [
      "invalid token",
      "unauthorized access",
    ]);

  return res.json({
    success: true,
    message: "User data fetched successfully",
    data: user
  });
};

// Route registrations
api.get("/user", "protected", getUserData);
api.post("/user/signup-otp", "noauth", getOtpForSignUp);
api.post("/user/signup", "noauth", signUp);
api.post("/user/signin-otp", "noauth", getOtpForSignIn);
api.post("/user/signin", "noauth", signIn);
