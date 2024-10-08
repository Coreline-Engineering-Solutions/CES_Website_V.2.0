import React from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const ProjectSelection = ({
    selection,
    setSelection,
    projectName,
    setProjectName,
    projectDescription,
    setProjectDescription,
    existingProjects,
    selectedProject, // Added selectedProject to track the active project
    setSelectedProject,
    CreateProject,
    handleOpenProject,
    deleteProject,
    fetchProjects,
    handleFetchData,
    handleFetchPointData
}) => {


    const handleCreateAndFetch = () => {
        CreateProject();
    };

    const handleProjectSelect = (project) => {
        // Clear any previous project data before setting the new project
        setSelectedProject(null);

        // Ensure the new project is set
        setSelectedProject(project.job_reference);
        handleOpenProject(project.job_reference);

        // Wait until the selected project is set, then fetch its data
        setTimeout(() => {
            handleFetchData();
            handleFetchPointData();
        }, 0); // This ensures fetch happens after project state is updated
    };

    const handleDeleteProject = (projectReference) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This project will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00309e',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProject(projectReference);
                fetchProjects();
                Swal.fire(
                    'Deleted!',
                    'Your project has been deleted.',
                    'success'
                );
            }
        });
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
                    <div className="space-y-2">
                        {existingProjects.map((project) => (
                            <div
                                key={project.job_reference}
                                className={`flex items-center justify-between p-2 rounded-lg shadow-sm border hover:bg-gray-100 cursor-pointer ${
                                    selectedProject === project.job_reference ? 'bg-blue-200 border-blue-500' : 'bg-white'
                                }`}
                                onClick={() => handleProjectSelect(project)}
                            >
                                <div>
                                    <span className="font-medium">{project.job_reference}</span> - {project.job_description}
                                </div>
                                <FaTrash
                                    className="text-red-500 hover:text-red-700"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteProject(project.job_reference);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectSelection;
