import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner } from "react-icons/fa";

const Modal = ({ showModal, handleCloseModal, modalContent }) => {
    useEffect(() => {
        if (showModal && modalContent) {
            navigator.clipboard.writeText(modalContent)
                .then(() => {
                    toast.success("Narrative content copied to clipboard!");
                })
                .catch(() => {
                    toast.error("Failed to copy content to clipboard.");
                });
        }
    }, [showModal, modalContent]);

    if (!showModal) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" style={{ zIndex: 9999 }}>
                <div className="bg-white rounded-lg p-5 shadow-lg w-3/4 max-w-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Narrative</h2>
                        <button onClick={handleCloseModal}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className="overflow-y-auto max-h-64">
                        {modalContent ? (
                            <p>{modalContent}</p>
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <FaSpinner className="animate-spin text-[#00309e]" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Modal;
