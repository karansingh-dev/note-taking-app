export const generateOtp = () => Math.floor(Math.random() * 1000000).toString();

export const OTP_REGEX = /^\d{6}$/;
