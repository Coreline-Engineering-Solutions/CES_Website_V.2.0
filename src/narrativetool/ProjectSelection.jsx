import React from "react";

const ProjectSelection = ({
    selection,
    setSelection,
    projectName,
    setProjectName,
    projectDescription,
    setProjectDescription,
    existingProjects,
    setSelectedProject,
    CreateProject,
    handleOpenProject,
    selectedProject,
}) => {

    const handleCreateAndFetch = () => {
        CreateProject();
    };

    const handleProjectSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedProject(selectedValue);
        handleOpenProject(selectedValue);
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="bg-gray-100 p-4 text-xl font-bold mb-4">Project Selection</h2>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 m-2">
                <button
                    className={`w-full sm:w-auto bg-[#00309e] text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-200 ${selection === "create" && "bg-blue-600"}`}
                    onClick={() => setSelection("create")}
                >
                    Create New Project
                </button>
                <button
                    className={`w-full sm:w-auto bg-[#00309e] text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-200 ${selection === "open" && "bg-blue-600"}`}
                    onClick={() => setSelection("open")}
                >
                    Open Existing Project
                </button>
            </div>
            {selection === "create" && (
                <div className="w-full mb-4">
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                        placeholder="Project Name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                        placeholder="Project Description"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                    />
                    <button
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition duration-200 mt-2"
                        onClick={handleCreateAndFetch}
                    >
                        Create Project
                    </button>
                </div>
            )}
            {selection === "open" && (
                <div className="w-full mb-4">
                    <select
                        className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                        onChange={handleProjectSelect}
                    >
                        <option value="">Select a project</option>
                        {existingProjects.map((project) => (
                            <option key={project.job_reference} value={project.job_reference}>
                                {project.job_reference} - {project.job_description}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default ProjectSelection;
