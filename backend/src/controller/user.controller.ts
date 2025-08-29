import type { Request, Response } from "express";
import {
  type RegisterData,
  registerUserSchema,
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

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const validatedData = validateBody<SignUpData>(signUpSchema, req.body);

  const userExist = await prisma.user.findUnique({
    where: {
      email: validatedData.email,
    },
    select: {
      isRegistered: true,
    },
  });

  if (userExist && userExist.isRegistered)
    throw new ApiError(400, "User already exists", ["Email already in use"]);

  validatedData.email = validatedData.email.toLowerCase();
  const otp = generateOtp();

  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 minutes

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
    },
  });

  const html = renderTemplate("otp-email-template", {
    name: validatedData.name,
    otp,
  });

  await sendEmail(validatedData.email, "note-taking-app otp", html);

  return res.json({
    success: true,
    message: "Otp Sent Successfully",
    data: null,
    error: null,
  });
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const validatedData = validateBody<RegisterData>(
    registerUserSchema,
    req.body
  );

  validatedData.email = validatedData.email.toLowerCase();
  const user = await prisma.user.findUnique({
    where: {
      email: validatedData.email,
    },
    select: {
      id: true,
      email: true,
      isRegistered: true,
      verifyCode: true,
      verifyCodeExpiresAt: true,
      authProvider: true,
    },
  });

  if (!user || user.isRegistered || user.authProvider != "email")
    throw new ApiError(400, "Failed to register user", [
      "User does not exist with this email",
      "User already registere with this email",
    ]);

  if (!(validatedData.otp === user.verifyCode))
    throw new ApiError(400, "Incorrect Otp", ["wrong otp sent", "invalid otp"]);
  else if (user.verifyCodeExpiresAt < new Date(Date.now()))
    throw new ApiError(400, "Otp expired", ["invalid otp"]);

  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      isRegistered: true,
    },
  });
  const payload = {
    userId: user.id,
    isRegistered: user.isRegistered,
    email: user.email,
  };

  const jwt = generateJwt(payload);

  return res.json({
    success: true,
    message: "Sign Up successfull",
    data: { jwt },
  });
};

api.post("/user", "noauth", signUp);
api.post("/user/register", "noauth", registerUser);
