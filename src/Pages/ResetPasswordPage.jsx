import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/backpack.png';

const api_route = import.meta.env.VITE_API_URL_AUTH;

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token'); // Extract token from URL

    if (!token) {
        alert("Invalid or missing token. Please check your link.");
        return null;
    }

    const validationSchema = Yup.object({
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        axios.post(`${api_route}/reset-password?token=${token}`, {
            newPassword: values.password,
        })
            .then(() => {
                alert("Password reset successful! You can now log in.");
            })
            .catch((err) => {
                console.error(err);
                alert("Error resetting password. Please try again.");
            });
        
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center font-poppins">
            <div className="flex flex-col items-center justify-center w-full max-w-md bg-gray-800 p-8 rounded-md shadow-lg">
                <img src={logo} className="w-20 h-20 mb-4" alt="Logo" />

                <h2 className="text-3xl font-semibold text-white mb-6">Reset Password</h2>

                <Formik
                    initialValues={{ password: '', confirmPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="w-full space-y-6">
                            <div>
                                <label htmlFor="password" className="block text-white mb-2">New Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    className="w-full px-3 py-2 text-white-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 mt-1"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-white mb-2">Confirm Password</label>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    className="w-full px-3 py-2 text-white-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="text-red-500 mt-1"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
                            </button>
                        </Form>
                    )}
                </Formik>

                <a href="/login" className="mt-3 text-blue-400 hover:underline">
                    Back to Login
                </a>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
