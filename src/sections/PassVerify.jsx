import React from 'react'
import { Link } from 'react-router-dom';

const PassVerify = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <h2 className=" text-blue-800 text-4xl mb-6">PassVerify Link Sent</h2>
                <p className="mb-4">The verification link has been sent to your email linked to this account.Click the link and follow the steps to reset your password.</p>
                <p className="text-gray-500">If you don't receive an email, check your spam folder or <a href="mailto:support@corelineengineering.com" className="hover:underline">contact support</a>.</p>
            
                <button
                    className=" w-2/5 mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                <Link to='/Login'>Back To Home</Link>  
                </button>
            </div>

        </div>
    );
}

export default PassVerify