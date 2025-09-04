import { Button, Checkbox, FormControlLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useSignin } from '../hooks/useSignin';
import BasicLoader from '../../../../components/atoms/basic-loader';
import { OrSeparator } from '../../../../components/atoms/or-separator';
import { handleGoogleSignIn } from '../../../../action/google-signin';




export default function SignInForm() {

    const {
        register,
        handleSubmit,
        errors,
        onSubmit,
        otpSent,

        setOtp,
        otpError,
        handleLogin,
        loading,
    } = useSignin();


    return <form onSubmit={handleSubmit(onSubmit)} id='signUp' className='relative space-y-4 w-full max-w-md'>

        <div className="text-center md:text-left relative">


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
                    className=''
                    onChange={(e) => setOtp(e.target.value)}
                />
            )}

            {otpSent && <button onClick={handleSubmit(onSubmit)} className='underline text-blue-500 text-sm self-start'>

                Resend Otp

            </button>}
            {otpError && <p className='text-rose-500'>{otpError}</p>}
        </div>
        <FormControlLabel control={<Checkbox />} label="Keep me logged in" />

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
            className=" text-white font-medium  w-full flex items-center gap-2"
        >
            <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="w-5 h-5"
            />
            Sign in with Google
        </Button>
    </form>
}