import React from 'react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#00309e] border-solid"></div>
            <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-gray-700">
                    Loading site...
                </p>
            </div>
        </div>
    );
};

export default Loader;