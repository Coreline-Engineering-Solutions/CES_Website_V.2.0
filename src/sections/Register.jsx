import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure you have this import
import { ces, Loginbg } from '../assets/images';
import { toast, ToastContainer } from 'react-toastify'; // Ensure you have this import and have installed react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Ensure you have this import
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        email_confirm: '',
        password: '',
        password_confirm: '',
    });
    const [errors, setErrors] = useState([]);
    const [registerResult, setRegisterResult] = useState('');

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        const { username, email, email_confirm, password, password_confirm } = formData;
        const errors = [];

        if (username.length < 3) {
            errors.push('Username must be at least 3 characters long.');
        }

        if (email !== email_confirm) {
            errors.push('Email addresses do not match.');
        }

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
            toast.error('Please correct the errors in the form.',{ toastId: 'register-Error', containerId: 'register-toast-container' });
            return;
        }

        try {
            const submissionData = {
                email: formData.email,
                password: formData.password,
                username: formData.username,
                email_confirm: formData.email_confirm,
                password_confirm: formData.password_confirm,
            };

            const response = await axios.post('https://www.corelineengineering.com/php/register.php', submissionData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = response.data;

            if (result === '_S') {
                toast.success('Registration successful! Please check your email for a verification code.',{ toastId: 'register-successs', containerId: 'register-toast-container' });
                navigate('/Verification'); // Ensure this rouwte exists
                setRegisterResult(''); // Reset RegisterResult after successful registration
            } else {
                toast.error('Registration failed. Please try again.',{ toastId: 'register-failed-Error', containerId: 'register-toast-container' });
                setRegisterResult(''); // Reset RegisterResult after displaying error message
            }
            setRegisterResult(result);
        } catch (error) {
            toast.error('An error occurred during registration. Please try again.',{ toastId: 'register-Error', containerId: 'register-toast-container' });
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
                    <h2 className="text-center text-4xl mb-6">Register New Account</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="form-control px-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control px-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email_confirm"
                            placeholder="Confirm Email Address"
                            value={formData.email_confirm}
                            onChange={handleChange}
                            className="form-control px-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
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
                        Register
                    </button>
                    <p className="mt-5 mb-1 text-gray-500 text-center">
                        © Coreline Engineering Solutions (PTY) Ltd
                    </p>
                    <p className="mb-3 text-gray-500 text-center">
                        <a href="mailto:info@corelineengineering.com?subject=Contact%20Us" className="hover:underline">Contact Us</a>
                    </p>
                </form>
                <ToastContainer containerId="register-toast-container" position="bottom-right" autoClose={3000} hideProgressBar={true} />

            </div>
        </div>
    );
}

export default Register;
