import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ces, Loginbg } from '../assets/images';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [loginResult, setLoginResult] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submissionData = {
                email: formData.email,
                password: formData.password,
                remember: formData.remember ? 'on' : 'off'
            };

            const response = await axios.post('https://www.corelineengineering.com/php/login.php', submissionData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const Data = response.data;
            if (Data.result == "_TRUE") {

                Cookies.set('username', Data.username, { expires: 1 });
                navigate('/DashBoard', { state: { username: Data.username } })
                setLoginResult('_TRUE');
            } else {
                setLoginResult('_FALSE');
            }

        } catch (error) {
            toast.error('An error occurred during login. Please try again.');
        }
    };

    useEffect(() => {
        if (loginResult === '_TRUE') {
            toast.success('Login successful!');

            setLoginResult(''); // Reset loginResult after successful login
        } else if (loginResult === '_FALSE') {
            toast.error('Login failed. Please check your credentials and try again.');
            setLoginResult(''); // Reset loginResult after displaying error message
        }
    }, [loginResult, navigate]);

    return (
        <div id='login' className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex justify-center items-center" style={{ backgroundImage: `url(${Loginbg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img className="p-2 mx-auto drop-shadow-xl" src={ces} alt="Logo" width={120} />
                </div>
                <h2 className="text-3xl font-bold mb-6 text-center">Verification</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" required />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 border border-transparent bg-blue-900 rounded-md shadow-sm text-white hover:bg-blue-500 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Sign in
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default VerifyEmail;
