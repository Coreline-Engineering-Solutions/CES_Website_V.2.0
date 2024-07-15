import React from 'react'

const Verification = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <h2 className="text-4xl mb-6">Registration Successful</h2>
                <p className="mb-4">You have registered successfully. Please check your email for a verification code.</p>
                <p className="text-gray-500">If you don't receive an email, check your spam folder or <a href="mailto:support@corelineengineering.com" className="hover:underline">contact support</a>.</p>
            </div>
        </div>
    );
}

export default Verification