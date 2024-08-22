import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure you have this import
import { ces, Loginbg } from '../assets/images';
import { toast, ToastContainer } from 'react-toastify'; // Ensure you have this import and have installed react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Ensure you have this import
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function PassReset() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        password_confirm: '',
    });
    const [errors, setErrors] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    const code = queryParams.get('code');

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        const {  password, password_confirm } = formData;
        const errors = [];

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!passwordRegex.test(password)) {
            errors.push('Password must be at least 8 characters long and contain numbers, symbols, uppercase and lowercase letters.');
        }

        if (password !== password_confirm) {
            errors.push('Passwords do not match.');
        }

        setErrors(errors);
        if (errors.length > 0) {
            errors.forEach(error => toast.error(error));
        }
        return errors.length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
            toast.error('Please correct the errors in the form.');
            return;
        }
    
        try {
            const submissionData = {
                password: formData.password,
                password_confirm: formData.password_confirm,
                email: email,
                code: code,
            };
    
            const response = await axios.post('https://www.corelineengineering.com/php/reset_3.php', submissionData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const result = response.data;
    
            if (result === '_TRUE') {
                toast.success('Password has been reset successfully');
    
                // Redirect after 3 seconds
                setTimeout(() => {
                    navigate('/Login'); // Ensure this route exists
                }, 3000);
    
            } else {
                toast.error('Password reset failed. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred during the process. Please try again.');
        }
    };
    

    return (
        <div
            id='Register'
            className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex justify-center items-center"
            style={{
                backgroundImage: `url(${Loginbg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img
                        className="p-2 drop-shadow-xl"
                        src={ces}
                        alt="Logo"
                        width={120}
                    />
                </div>
                <form
                    className="mx-auto w-full "
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-center text-4xl mb-6">Reset Password</h2>

                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control px-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="password_confirm"
                            placeholder="Confirm Password"
                            value={formData.password_confirm}
                            onChange={handleChange}
                            className="form-control px-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    {errors.length > 0 && (
                        <div className="mb-4">
                            {errors.map((error, index) => (
                                <p key={index} className="bg-red-500 text-center text-white py-2 rounded">{error}</p>
                            ))}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    >
                        Confirm Password
                    </button>
                    <p className="mt-5 mb-1 text-gray-500 text-center">
                        © Coreline Engineering Solutions (PTY) Ltd
                    </p>
                    <p className="mb-3 text-gray-500 text-center">
                        <a href="mailto:info@corelineengineering.com?subject=Contact%20Us" className="hover:underline">Contact Us</a>
                    </p>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default PassReset;
