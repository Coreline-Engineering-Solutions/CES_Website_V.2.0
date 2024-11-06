import React, { useState, useEffect } from "react";
import { FaDownload, FaTrash } from "react-icons/fa";
import { radioMapPoints, radioMapLines } from "../constants";
import { ToggleSwitch } from "../components";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProjectDetails = ({
    projectDetails,
    handleClearSession,
    setLocateType,
    setLineName,
    lineName,
    locateType,
    onToggle,
    lineLength,
    setLineLength,
    setWorkPrint,
    handleDownloadExcel,
    onToggleChange, // New prop to handle the toggles state change
    onSelectedOptionChange, // New prop to handle the selected option state change
    stateToggles,
    stateOptions,
    workPrints,
    setPointData,
    pointData,
}) => {
    const [selectedOption, setSelectedOption] = useState(""); // State to manage the selected option
    const [toggles, setToggles] = useState({
        Note_intersection_at_start: false,
        Note_intersection_at_end: false,
        Note_address_at_start: false,
        Note_address_at_end: false,
        Include_GPS_at_start: false,
        Include_GPS_at_end: false,
        Include_GPS_at_bearing: false,
        // Split_on_max_length: false,
    });

    const [localWorkPrint, setLocalWorkPrint] = useState(workPrints || "");

    // Update the component's state whenever props change
    useEffect(() => {
        if (stateToggles) setToggles(stateToggles);
        if (stateOptions) setSelectedOption(stateOptions);
        if (workPrints) setLocalWorkPrint(workPrints);
    }, [stateToggles, stateOptions, workPrints]);

    const handleToggle = (key) => {
        setToggles((prevToggles) => {
            const updatedToggles = {
                ...prevToggles,
                [key]: !prevToggles[key],
            };
            onToggleChange(updatedToggles); // Send updated toggles to the parent
            return updatedToggles;
        });
    };

    //Narrative Lines data set

    const handleLocateTypeChange = (event) => {
        const locateType = event.target.value;
        setLocateType(locateType);
    };

    const handleLineNameChange = (event) => {
        const lineName = event.target.value;
        setLineName(lineName);
    };

    const handleLineLengthChange = (event) => {
        const lineLength = event.target.value;
        setLineLength(lineLength);
    };

    const handleWorkPrintChange = (event) => {
        const workPrint = event.target.value;
        setLocalWorkPrint(workPrint);
        setWorkPrint(workPrint); // Update parent's workPrint state
    };

    //Narrative Point data set

    const handlePointNameChange = (event) => {
        const pointName = event.target.value;
        setPointData({ ...pointData, pointName });
    };

    const handleWorkPrintPointChange = (event) => {
        const workPrintPoint = event.target.value;
        setPointData({ ...pointData, workPrintPoint });
    };

    const handlePointTypeChange = (event) => {
        const pointType = event.target.value;
        setPointData({ ...pointData, pointType });
    };

    const handleNoteChange = (event) => {
        const pointNote = event.target.value;
        setPointData({ ...pointData, pointNote });
    };

    const handleRadiusChange = (event) => {
        const radius = event.target.value;
        setPointData({ ...pointData, radius });
    };

    const handleLocationDirectionChange = (event) => {
        const locationDirection = event.target.value;
        setPointData({ ...pointData, locationDirection });
    };
    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        onSelectedOptionChange(selectedValue); // Send selected option to the parent
    
        if (selectedValue === "points") {
            toast.info("Click on a marker after it's placed to add the address.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                containerId: "projectDetailsContainer"
            });
        }
    };


    return (
        <div className="w-full">
           <ToastContainer containerId="projectDetailsContainer" />
            <h2 className="bg-gray-100 p-4 text-xl font-bold mb-4">Project Details</h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="text-2xl font-bold text-[#00309e]  tracking-wide uppercase mb-2">
                    TITLE: {projectDetails?.job_reference}
                </p>
                <p className="text-md text-gray-700 italic leading-relaxed transition-all duration-300">
                    DESCRIPTION: {projectDetails?.job_description}
                </p>
                <div className="flex flex-row space-x-2 mt-4 p-3 bg-gray-200 rounded-lg shadow-md">
                    <button
                        className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-400 transition duration-200 items-center justify-center"
                        onClick={handleClearSession}
                        title="Clear Session"
                    >
                        <FaTrash className="text-2xl" />
                    </button>
                    <button
                        className="bg-[#00309e] text-white p-3 rounded-lg hover:bg-blue-500 transition duration-200 items-center justify-center"
                        onClick={handleDownloadExcel}
                        title="Download Excel"
                    >
                        <FaDownload className="text-2xl" />
                    </button>
                    <ToggleSwitch onToggle={onToggle} />
                </div>

                {/* Radio Buttons for Option Selection */}
                <div className="flex space-x-4 mt-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            value="lines"
                            checked={selectedOption === "lines"}
                            onChange={handleOptionChange}
                            className="form-radio"
                        />
                        <span>Narrative Lines</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            value="points"
                            checked={selectedOption === "points"}
                            onChange={handleOptionChange}
                            className="form-radio"
                        />
                        <span>Narrative Points</span>
                    </label>

                    {/* <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            value="points"
                            checked={selectedOption === "points"}
                            onChange={handleOptionChange}
                            className="form-radio"
                        />
                        <span>Narrative Points</span>
                    </label> */}
                </div>


                {/* Conditionally Render Input Fields */}
                {selectedOption === "lines" && (
                    <div className="flex flex-col space-y-4 mt-4">
                        <div>
                            <label className="block text-gray-700">Locate Type:</label>
                            <select
                                id="downloadOption"
                                value={locateType}
                                onChange={handleLocateTypeChange}
                                className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                            >
                                <option value="">Select an option</option>
                                {radioMapLines.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Line Name:</label>
                            <input
                                value={lineName}
                                className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                                placeholder="Enter line name"
                                onChange={handleLineNameChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Work Print</label>
                            <input
                                value={localWorkPrint}
                                className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                                placeholder="Enter Work Print"
                                onChange={handleWorkPrintChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Max Line Length</label>
                            <label className="block text-xs text-gray-700">* If Applicable</label>
                            <input
                                type="number"
                                value={lineLength}
                                className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                                placeholder="Enter radius"
                                onChange={handleLineLengthChange}
                                onKeyDown={(e) => {
                                    // Prevent entering 'e', '+', '-', and other non-number characters
                                    if (
                                        e.key === 'e' ||
                                        e.key === 'E' ||
                                        e.key === '+' ||
                                        e.key === '-' ||
                                        e.key === '.'
                                    ) {
                                        e.preventDefault();
                                    }
                                }}
                                min="0" // This will prevent negative numbers
                            />
                        </div>
                        {/* Display toggles dynamically */}
                        {Object.keys(toggles).map((key) => (
                            <div key={key} className="flex items-center justify-between space-x-4">
                                <span>{key.replace(/_/g, ' ')}</span>
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={toggles[key]}
                                            onChange={() => handleToggle(key)}
                                        />
                                        <div
                                            className={`w-10 h-4 rounded-full shadow-inner transition-colors duration-300 ${toggles[key] ? 'bg-[#00309e]' : 'bg-gray-300'}`}
                                        ></div>
                                        <div
                                            className={`absolute w-6 h-6 rounded-full shadow -left-1 -top-1 transition-transform duration-300 ${toggles[key] ? 'transform translate-x-full bg-gray-200' : 'bg-gray-200'}`}
                                        ></div>
                                    </div>
                                    <span className="ml-3">{toggles[key] ? 'Yes' : 'No'}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                )}

                {selectedOption === "points" && (
                    <div className="flex flex-col space-y-4 mt-4">
                        <div>
                            <label className="block text-gray-700">Point Name:</label>
                            <input
                                value={pointData.pointName}
                                className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                                placeholder="Enter point name"
                                onChange={handlePointNameChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Point Type:</label>
                            <select
                                id="downloadOption"
                                value={pointData.pointType}
                                onChange={handlePointTypeChange}
                                className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                            >
                                <option value="">Select an option</option>
                                {radioMapPoints.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Work Print</label>
                            <input
                                value={pointData.workPrintPoint}
                                className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                                placeholder="Enter Work Print"
                                onChange={handleWorkPrintPointChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Point Radius</label>
                            <input
                                type="number"
                                value={pointData.radius}
                                className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                                placeholder="Enter radius"
                                onChange={handleRadiusChange}
                                onKeyDown={(e) => {
                                    // Prevent entering 'e', '+', '-', and other non-number characters
                                    if (
                                        e.key === 'e' ||
                                        e.key === 'E' ||
                                        e.key === '+' ||
                                        e.key === '-' ||
                                        e.key === '.'
                                    ) {
                                        e.preventDefault();
                                    }
                                }}
                                min="0" // This will prevent negative numbers
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Location/Direction:</label>
                            <input
                                value={pointData.locationDirection}
                                className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                                placeholder="Enter location/direction"
                                onChange={handleLocationDirectionChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Point Note:</label>
                            <input
                                value={pointData.pointNote}
                                className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                                placeholder="Prefix/Suffix"
                                onChange={handleNoteChange}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetails;
