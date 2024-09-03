import React, { useEffect, useRef } from "react";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ showModal, handleCloseModal, modalContent }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (showModal && modalContent) {
            navigator.clipboard.writeText(modalContent)
                .then(() => {
                    toast.success("Narrative content copied to clipboard!", { toastId: 'modal-toast', containerId: 'modal-toast-container' });
                })
                .catch(() => {
                    toast.error("Failed to copy content to clipboard.", { toastId: 'modal-toast-error', containerId: 'modal-toast-container' });
                });
        }
    }, [showModal, modalContent]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseModal();
            }
        };

        if (showModal) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showModal, handleCloseModal]);

    if (!showModal) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div
                    ref={modalRef}
                    className="bg-white rounded-lg p-5 shadow-lg w-3/4 max-w-lg"
                    style={{ zIndex: 9999 }}
                >
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
            <ToastContainer containerId="modal-toast-container" />
        </>
    );
};

export default Modal;
