
import SideImage from '../../components/atoms/side-image';
import SignUpForm from '../../feature/auth/signup/components/signup-form';

export default function SignUp() {




    return (
        <div className="min-h-screen bg-white">
            {/*  Logo In Desktop Format (top-left corner) */}
            <div className="hidden md:flex absolute top-6 left-6 items-center">
                <img src="/logo-ico.png" alt="logo" className="h-8 w-8" />
                <span className="text-lg font-semibold">HD</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

                {/* form  */}
                <div className='flex justify-center flex-col items-center gap-2 p-6'>
                    {/*  Logo in Mobile format (center above form) */}
                    <div className="flex md:hidden items-center justify-center gap-2 mb-4">
                        <img src="/logo-ico.png" alt="logo" className="h-8 w-8" />
                        <span className="text-lg font-semibold">HD</span>
                    </div>

                    {/* signup form  */}
                    <SignUpForm />

                    <div className='text-sm font-normal mt-3'>
                        Already have an Account?{" "}
                        <a className='text-blue-500 underline' href="/signin">Sign in</a>
                    </div>
                </div>

                {/* image  */}
                <SideImage />
            </div>
        </div>
    );
}
