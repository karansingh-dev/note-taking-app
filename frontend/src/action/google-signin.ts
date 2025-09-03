export const handleGoogleSignIn = () => {
  window.location.href = import.meta.env.VITE_GOOGLE_AUTH as string;
};
