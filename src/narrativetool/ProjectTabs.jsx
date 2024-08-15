import React from "react";

const ProjectTabs = ({ activeTab, setActiveTab, selectedProject }) => {
    return (
        <div className="mb-4 flex border-b-2 border-gray-300">
            <button
                className={`mr-2 px-4 py-2 ${activeTab === "selection" ? "duration-300 bg-[#00309e] text-white border-blue-600" : "bg-gray-200 text-gray-600 border-gray-200"} border-b-2 rounded-t-lg`}
                onClick={() => setActiveTab("selection")}
            >
                Project Selection
            </button>
            <button
                className={`mr-2 px-4 py-2 ${selectedProject ? (activeTab === "details" ? "duration-300 bg-[#00309e] text-white border-blue-600" : "bg-gray-200 text-gray-600 border-gray-200") : "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100"} border-b-2 rounded-t-lg`}
                onClick={() => selectedProject && setActiveTab("details")}
                disabled={!selectedProject}
            >
                Project Details
            </button>
            <button
                className={`mr-2 px-4 py-2 ${selectedProject ? (activeTab === "table" ? " duration-300 bg-[#00309e] text-white border-blue-600" : "bg-gray-200 text-gray-600 border-gray-200") : "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100"} border-b-2 rounded-t-lg`}
                onClick={() => selectedProject && setActiveTab("table")}
                disabled={!selectedProject}
            >
                Narrative Table
            </button>
        </div>
    );
};

export default ProjectTabs;