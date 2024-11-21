import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import logo from '../assets/backpack.png';

const api_route = import.meta.env.VITE_API_URL_AUTH;

const ForgotPasswordPage = () => {
    const handleSubmit = (values, { setSubmitting }) => {
        axios.post(`${api_route}/forgot-password`, { email: values.email })
            .then(() => {
                alert("Password reset email sent! Check your inbox.");
            })
            .catch((err) => {
                console.error(err);
                alert("Error sending password reset email. Please try again.");
            })
            .finally(() => setSubmitting(false));
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
    });

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center font-poppins">
            <div className="flex flex-col items-center justify-center w-full max-w-md bg-gray-800 p-8 rounded-md shadow-lg">
                <img src={logo} className="w-20 h-20 mb-4" alt="Logo" />

                <h2 className="text-3xl font-semibold text-white mb-6">Forgot Password</h2>

                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="w-full space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-white mb-2">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="w-full px-3 py-2 text-white-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900"
                                    placeholder="example@example.com"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 mt-1"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Send Reset Email'}
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

export default ForgotPasswordPage;
