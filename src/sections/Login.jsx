import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import { ces, Loginbg } from '../assets/images';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate  } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    // State to hold form data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false // Initially set to false for "Remember me" checkbox
    });

    const [loginResult, setLoginResult] = useState('');

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        // Update the corresponding state field based on the input type
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Prepare the data for submission
            const submissionData = {
                email: formData.email,
                password: formData.password,
                remember: formData.remember ? 'on' : 'off'
            };

            // Send a POST request to the server with form data using Axios
            const response = await axios.post('http://www.corelineengineering.com/php/login.php', submissionData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = response.data;

            if (result === '_True') {
                setLoginResult('_True');
            } else {
                setLoginResult('_False');
            }

            console.log(setLoginResult); // Log the response data to console (for debugging)
            // Redirect user to '/gis' upon successful login
            // history.push('/gis'); // Replace '/gis' with your desired redirect path
        } catch (error) {
            console.error('Error logging in:', error); // Log any errors encountered during login
            // Handle error messages or display them to the user
            toast.error('An error occurred during login. Please try again.');
        }
    };
            // Use effect to watch loginResult and show toast
            useEffect(() => {
                if (loginResult === '_True') {
                    toast.success('Login successful!');
                    navigate('/DashBoard');
                } else if (loginResult === '_False') {
                    toast.error('Login failed. Please check your credentials and try again.');
                }
            }, [loginResult]);

    return (
        <div id='login' className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex justify-center items-center" style={{ backgroundImage: `url(${Loginbg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {/* Centering the logo */}
                <div className="flex justify-center mb-6">
                    <img className="p-2 mx-auto drop-shadow-xl" src={ces} alt="Logo" width={120} />
                </div>
                <h2 className="text-3xl font-bold mb-6 text-center">Log In</h2>
                <form onSubmit={handleSubmit}>
                    {/* Email input field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" required />
                    </div>
                    {/* Password input field */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" required />
                    </div>
                    {/* Remember me checkbox */}
                    <div className="flex items-center mb-4">
                        <input type="checkbox" id="remember" name="remember" checked={formData.remember} onChange={handleChange} className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">Stay logged in</label>
                    </div>
                    {/* Error or success message display */}
                    <div className="mb-4">
                        {/* Placeholder for displaying error or success messages */}
                        {/* Example: <p className="text-red-500">{errorMessage}</p> */}
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="w-full py-2 px-4 border border-transparent bg-blue-900 rounded-md shadow-sm text-white hover:bg-blue-500 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Sign in
                    </button>
                </form>
                {/* Additional links (Forgot password? and Register) */}
                <div className="mt-4 text-center">
                    <a href="./reset_1.php" className="text-primary-600 hover:text-primary-800">Forgot password?</a>
                    <span className="mx-2 text-gray-400">|</span>
                    <a href="./register.php" className="text-primary-600 hover:text-primary-800">Register</a>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Login;
