import React from "react";
import { FaDownload, FaTrash} from "react-icons/fa";
import { radioMap } from "../constants";
import { ToggleSwitch } from "../components";

const ProjectDetails = ({ projectDetails, handleOpenNarrative, handleClearSession, handleDownloadCSV, setLocateType, setLineName,lineName,locateType,onToggle }) => {

    const handleLocateTypeChange = (event) => {
        const locateType = event.target.value;
		setLocateType(locateType);
	};

	const handleLineNameChange = (event) => {
        const lineName = event.target.value;
		setLineName(lineName);
	};

    return (
        <div className="w-full">
            <h2 className="bg-gray-100 p-4 text-xl font-bold mb-4">Project Details</h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="text-lg font-semibold">{projectDetails?.job_reference}</p>
                <p className="text-sm text-gray-600">{projectDetails?.job_description}</p>
                <div className="flex flex-col space-y-4 mt-4">
                    <div>

                        <ToggleSwitch onToggle={onToggle}/>
                        <label className="block text-gray-700">Locate Type:</label>
                        <select
                            id="downloadOption"
                            value= {locateType} // Bind select value to locateType
                            onChange={handleLocateTypeChange}
                            className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                        >
                            <option value="">Select an option</option> {/* Ensure there's a default option */}
                            {radioMap.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Line Name:</label>
                        <input
                            
                            value= {lineName}
                            className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                            placeholder="Enter line name"
                            onChange={handleLineNameChange}
                        />
                    </div>
                    <div className="flex space-x-2">
                        <button
                            className="w-full bg-red-500 text-white py-2 sm:py-3 rounded-lg hover:bg-red-400 transition duration-200 flex items-center justify-center space-x-2"
                            onClick={handleClearSession}
                        >
                               <FaTrash className="mx-2" />
                            Clear Session
                        </button>
                        <button
                            className="w-full bg-[#00309e] text-white py-2 sm:py-3 rounded-lg hover:bg-blue-500 transition duration-200 flex items-center justify-center space-x-2"
                            onClick={handleDownloadCSV}
                        >
                            <FaDownload className="mx-2" />
                            Download CSV
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProjectDetails;