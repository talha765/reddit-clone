import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // For validation
import { useNavigate } from 'react-router-dom';
import logo from '../assets/backpack.png';
import axios from "axios";
import Cookies from 'js-cookie';

const api_route = import.meta.env.VITE_API_URL_AUTH;

const LoginPage = () => {
    const navigate = useNavigate();

    // Define validation schema using Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    });

    // Formik's handleSubmit will automatically pass the values into this function
    const handleSubmit = (values, { setSubmitting }) => {
        const email = values.email;
        const password = values.password;
    
    
        axios.post(`${api_route}/login`, { email, password })
            .then((response) => {
                // Set token and user ID in cookies
                Cookies.set('token', response.data.token, { expires: 7 }); // Expires in 7 days
                Cookies.set('id', response.data.id, { expires: 7 }); // Expires in 7 days
                
                // Optionally, you can also set the user type in cookies
                Cookies.set('type', response.data.type, { expires: 7 });
            })
            .then(() => {
                // Navigate after cookies are set
                navigate('/');
            })
            .catch((err) => {
                console.error(err);
                alert("Invalid username or password. Error: ", err);
            })
            .finally(() => {
                setSubmitting(false);  // Ensure form is no longer submitting
            });
    };
    

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center font-poppins">
            <div className="flex flex-col items-center justify-center w-full max-w-md bg-gray-800 p-8 rounded-md shadow-lg">
                <img src={logo} className="w-20 h-20 mb-4" alt="Logo" />

                <h2 className="text-3xl font-semibold text-white mb-6">Login</h2>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit} // Formik automatically passes form values here
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

                            <div>
                                <label htmlFor="password" className="block text-white mb-2">Password</label>
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

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="text-white mt-4">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-blue-400 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
