import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // For validation
import { useNavigate } from 'react-router-dom';
import logo from '../assets/backpack.png';
import axios from 'axios';

const api_route = "https://studentresreachlab.com/api/auth/register";

const SignupPage = () => {
    const navigate = useNavigate();

    // Define validation schema using Yup
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        type: Yup.string()
            .oneOf(['student', 'researcher','company'], 'Select a valid type')
            .required('Type is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
        phoneNo: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    });

    const handleSubmit = (values) => {
        console.log('Signup submitted:', values);
        const firstName = values.firstName;
        const lastName = values.lastName;
        const email = values.email;
        const password = values.password;
        const username = values.username;
        const type = values.type;
        const phone = values.phone;
        // Add logic for API call or validation
        // Redirect to home page or dashboard after signup
        axios.post(api_route, { firstName, lastName, email, password, username, type, phone})
            .then((response) => {
                alert("signup successful");
                navigate('/login');
            }).catch((err) => {
                console.error(err); 
                alert("signup failed. Error: ", err);
            });
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center font-poppins">
            <div className="mt-5 mb-5 flex flex-col items-center justify-center w-full max-w-md bg-gray-800 p-8 rounded-md shadow-lg">
                <img src={logo} className="w-20 h-20 mb-4" alt="Logo" />

                <h2 className="text-3xl font-semibold text-white mb-6">Sign Up</h2>
                
                <Formik
                    initialValues={{ firstName: '', lastName: '', type: '', email: '', password: '', phoneNo: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="w-full space-y-6">
                            <div>
                                <label htmlFor="firstName" className="block text-white mb-2">First Name</label>
                                <Field
                                    type="text"
                                    name="firstName"
                                    className="w-full px-3 py-2 text-white-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900"
                                />
                                <ErrorMessage
                                    name="firstName"
                                    component="div"
                                    className="text-red-500 mt-1"
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-white mb-2">Last Name</label>
                                <Field
                                    type="text"
                                    name="lastName"
                                    className="w-full px-3 py-2 text-white-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900"
                                />
                                <ErrorMessage
                                    name="lastName"
                                    component="div"
                                    className="text-red-500 mt-1"
                                />
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-white mb-2">Type</label>
                                <Field
                                    as="select"
                                    name="type"
                                    className="w-full px-3 py-2 rounded-lg bg-gray-900 text-white-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Type</option>
                                    <option value="student">Student</option>
                                    <option value="researcher">Researcher</option>
                                    <option value="company">Company</option>
                                </Field>    
                                <ErrorMessage
                                    name="type"
                                    component="div"
                                    className="text-red-500 mt-1"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-white mb-2">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="w-full px-3 py-2 text-white-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900"
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

                            <div>
                                <label htmlFor="phoneNo" className="block text-white mb-2">Phone No.</label>
                                <Field
                                    type="text"
                                    name="phoneNo"
                                    className="w-full px-3 py-2 text-white-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900"
                                />
                                <ErrorMessage
                                    name="phoneNo"
                                    component="div"
                                    className="text-red-500 mt-1"
                                />
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-white mb-2">username</label>
                                <Field
                                    type="text"
                                    name="username"
                                    className="w-full px-3 py-2 text-white-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900"
                                />
                                <ErrorMessage
                                    name="username"
                                    component="div"
                                    className="text-red-500 mt-1"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Signing up...' : 'Sign Up'}
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="text-white mt-4">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-400 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
