import React, { useEffect, useRef, useState } from "react";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ModalMoreInfo = ({ showModal, handleCloseModal, modalContentInfo, handleFetchData, handleFetchPointData }) => {
    const modalRef = useRef(null);
    const [modalData, setModalData] = useState(null);
    const [loading, setLoading] = useState(false);


    const fetchData = async () => {
        setLoading(true); // Start loading

        try {
            const [dataResults, pointDataResults] = await Promise.all([
                handleFetchData(),
                handleFetchPointData(),
            ]);

            const combinedData = [...dataResults, ...pointDataResults];

            const matchedData = combinedData.find(item => item.timestamp === modalContentInfo);

            if (matchedData) {
                setModalData(matchedData);
            } else {
                toast.error("No matching data found.", { toastId: 'modal-toast-error-nodata', containerId: 'modal-toast-container' });
            }
        } catch (error) {
            toast.error("Error fetching data.", { toastId: 'modal-toast-error-fetch', containerId: 'modal-toast-container' });
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        // Fetch data only if the modal is open and there is content to show
        if (showModal && modalContentInfo) {
            fetchData();
        } else {
            setModalData(null); // Reset modal data when modal closes or content info changes
        }
    }, [showModal, modalContentInfo]);

    useEffect(() => {
        if (showModal && modalContentInfo) {
            navigator.clipboard.writeText(modalContentInfo)
                .then(() => {
                    toast.success("Narrative content copied to clipboard!", { toastId: 'modal-toast', containerId: 'modal-toast-container' });
                })
                .catch(() => {
                    toast.error("Failed to copy content to clipboard.", { toastId: 'modal-toast-error', containerId: 'modal-toast-container' });
                });
        }
    }, [showModal, modalContentInfo]);

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
                        <h2 className="text-xl font-bold">Narrative Object Details</h2>
                        <button onClick={handleCloseModal}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className="overflow-y-auto max-h-64">
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <FaSpinner className="animate-spin text-[#00309e]" />
                            </div>
                        ) : modalData ? (
                            <div className="text-sm text-gray-700">
                                <h3 className="font-semibold mb-2">Narrative:</h3>
                                <p className="mb-4">{modalData.narative}</p> {/* Fixed 'narative' to 'narrative' */}

                                <h3 className="font-semibold mb-2">Additional Info:</h3>
                                <p className="mb-1"><strong>Timestamp:</strong> {new Date(modalData.timestamp).toLocaleString()}</p>
                                <p className="mb-1"><strong>Type:</strong> {modalData.type}</p>

                                {modalData.hyperlink && (
                                    <a 
                                        href={modalData.hyperlink.trim()} 
                                        className="text-blue-500 underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View More Details
                                    </a>
                                )}
                            </div>
                        ) : (
                            <p>No content available</p>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer containerId="modal-toast-container" />
        </>
    );
}

export default ModalMoreInfo;
