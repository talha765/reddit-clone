import logo from '../assets/backpack.png';

const CheckEmailPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center font-poppins">
            <div className="flex flex-col items-center justify-center w-full max-w-md bg-gray-800 p-8 rounded-md shadow-lg">
                <img src={logo} className="w-20 h-20 mb-4" alt="Logo" />

                <h2 className="text-3xl font-semibold text-white mb-6">Check Your Email</h2>

                <p className="text-white text-center mb-6">
                    We have sent a password reset link to your email address. Please check your inbox
                    and follow the instructions to reset your password.
                </p>

                <a href="/login" className="text-blue-400 hover:underline">
                    Back to Login
                </a>
            </div>
        </div>
    );
};

export default CheckEmailPage;
