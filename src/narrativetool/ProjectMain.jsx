import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectTabs from "./ProjectTabs";
import ProjectSelection from "./ProjectSelection";
import ProjectDetails from "./ProjectDetails";
import ProjectTable from "./ProjectTable";
import Modal from "./ProjectModal";
import { ces, Loginbg } from "../assets/images";

const ProjectMain = ({
	setSelectedProject,
	selectedProject,
	LocateLine,
	handleFetchData,
	projectLines,
	setLocateType,  // Add these props
	setLineName,
	lineName,
	locateType,
	setShowPins,
	lineLength,
	setLineLength,  // Add these props
}) => {
	const [selection, setSelection] = useState("");
	const [projectName, setProjectName] = useState("");
	const [projectDescription, setProjectDescription] = useState("");
	const [existingProjects, setExistingProjects] = useState([]);
	const [projectDetails, setProjectDetails] = useState("");
	const [narrativeLines, setNarrativeLines] = useState([]); // Lines fetched from the database
	const [newLines, setNewLines] = useState([]); // Newly drawn lines
	const location = useLocation();
	const username = location.state?.username || "";
	const [selectedOption, setSelectedOption] = useState("");
	const [activeTab, setActiveTab] = useState("selection");
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 5;
	const [width, setWidth] = useState(380); // Initial width of the section
	const [isDragging, setIsDragging] = useState(false);

	const handleMouseDown = () => {
		setIsDragging(true);
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	};

	const handleMouseMove = (e) => {
		if (isDragging) {
			const newWidth = e.clientX;
			setWidth(newWidth > 100 ? newWidth : 100); // Minimum width of 100px
		}
	};

	useEffect(() => {
		if (selectedProject) {
			handleFetchData(selectedProject);
			setActiveTab("details"); // Automatically switch to the details tab
		}
		fetchProjects();

	}, [selectedProject]);

	const fetchProjects = async () => {
		try {
			const response = await axios.post(
				"https://www.corelineengineering.com/php/fetch_projects.php",
				{ _USERNAME: username }
			);
			setExistingProjects(response.data);
		} catch (error) {
			if (!toast.isActive("fetchProjectsError")) {
				toast.error("Error fetching projects", { containerId: "projectToastContainer" });
			}
		}
	};
	const handleToggle = (toggleValue) => {
		setShowPins(toggleValue === 1);
	};
	const CreateProject = async () => {
		// Ensure projectName and projectDescription are defined and trimmed
		const trimmedProjectName = projectName?.trim() || "";
		const trimmedProjectDescription = projectDescription?.trim() || "";

		// Check if a project with the same name or description already exists
		const projectExists = existingProjects.some(
			(project) =>
				project.job_reference?.trim() === trimmedProjectName ||
				project.job_description?.trim() === trimmedProjectDescription
		);

		if (projectExists) {
			toast.error(
				"A project with the same name or description already exists. Please use a different name or description.",
				{ containerId: "projectToastContainer" }
			);
			return; // Prevent further execution
		}

		try {
			const submissionData = {
				_PROJECT: trimmedProjectName,
				_DESCRIPTION: trimmedProjectDescription,
				_USERNAME: username,
			};
			const response = await axios.post(
				"https://www.corelineengineering.com/php/create_project.php",
				submissionData
			);
			setProjectDetails({
				job_reference: trimmedProjectName,
				job_description: trimmedProjectDescription,
			});
			fetchProjects();
			setSelectedProject(submissionData._PROJECT);
			setActiveTab("details");
			if (response.data === "_S") {
				toast.success("Project created successfully", {
					containerId: "projectToastContainer",
				});
			} else {
				toast.error("Failed to create project", {
					containerId: "projectToastContainer",
				});
			}
		} catch (error) {
			if (!toast.isActive("createProjectError")) {
				toast.error("Error creating project", {
					containerId: "projectToastContainer",
				});
			}
		}
	};



	const handleOpenProject = (projectReference) => {

		const project = existingProjects.find(
			(p) => p.job_reference === projectReference
		);

		if (project) {
			setProjectDetails(project);
			setSelectedProject(projectReference);
			setActiveTab("details");
		} else {
			console.error("Project not found for reference:", projectReference);
		}
	};

	const handleOpenNarrative = (narrative) => {
		setModalContent(narrative);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setModalContent("");
	};

	const handleDeleteLine = async (line) => {
		try {
			const response = await axios.post(
				"https://www.corelineengineering.com/php/nar_l_delete.php",
				{
					USERNAME: username,
					PROJECT: selectedProject,
					TIMESTAMP: line.timestamp,
				}
			);

			if (response.data === "_S") {
				setNarrativeLines((prevLines) =>
					prevLines.filter((prevLine) => prevLine.timestamp !== line.timestamp)
				);
				handleFetchData(); // Reload table
			}
		} catch (error) {
			if (!toast.isActive("deleteLineError")) {
				toast.error("Error caught when deleting line", { containerId: "projectToastContainer" });
			}
		}
	};


	const deleteProject = async (projectReference) => {
		try {
			const response = await axios.post(
				"https://www.corelineengineering.com/php/delete_nar_project.php",
				{
					USERNAME: username,
					PROJECT: projectReference,
				}
			);

			if (response.data === "_S") {
				fetchProjects();
				setSelectedProject(null); // or an empty state like {}
				// Optionally reset the active tab:
				setActiveTab("selection");
				// Refresh the projects list after deletion
				toast.success("Project deleted successfully", {
					containerId: "projectToastContainer",
				});
			} else {
				toast.error("Failed to delete project", {
					containerId: "projectToastContainer",
				});
			}
		} catch (error) {
			if (!toast.isActive("deleteProjectError")) {
				toast.error("Error caught when deleting project", {
					containerId: "projectToastContainer",
				});
			}
		}
	};


	const handleClearSession = async () => {
		try {
			const response = await axios.post(
				"https://www.corelineengineering.com/php/clear_l_session.php",
				{
					USERNAME: username,
					PROJECT: selectedProject,
				}
			);

			if (response.data === "_S") {
				handleFetchData(); // Reload table
			}
		} catch (error) {
			if (!toast.isActive("clearSessionError")) {
				toast.error("Error caught when clearing session", { containerId: "projectToastContainer" });
			}
		}
	};

	const handleDownloadCSV = async () => {
		try {
			const response = await axios.post(
				"https://www.corelineengineering.com/php/csv_downloader.php",
				{
					USERNAME: username,
					PROJECT: selectedProject,
				}
			);

			if (response.data === "_S") {
				toast.success("Downloading CSV", { toastId: "downloadCSVSuccess" });
			} else if (response.data.error === "No data found") {
				if (!toast.isActive("noDataError")) {
					toast.error("No data found for the selected project", {
						toastId: "noDataError",
					});
				}
			} else if (Array.isArray(response.data)) {
				const csvContent = convertToCSV(response.data);
				downloadCSV(csvContent, "project_data.csv");
			}
		} catch (error) {
			if (!toast.isActive("downloadCSVError")) {
				toast.error("Error caught when clearing session", { containerId: "projectToastContainer" });
			}
		}
	};

	const convertToCSV = (data) => {
		const replacer = (key, value) => (value === null ? "" : value);
		const csvRows = [];

		// Extract headers
		const headers = Object.keys(data[0]);
		csvRows.push(headers.join(","));

		// Extract rows
		for (const row of data) {
			const values = headers.map((header) =>
				JSON.stringify(row[header], replacer)
			);
			csvRows.push(values.join(","));
		}

		return csvRows.join("\n");
	};



	const downloadCSV = (csvContent, fileName) => {
		const blob = new Blob([csvContent], { type: "text/csv" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.setAttribute("hidden", "");
		a.setAttribute("href", url);
		a.setAttribute("download", fileName);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	return (
		<div
			className="flex h-screen"
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
		>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundImage: `url(${Loginbg})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					transform: "scaleY(-1)",
					zIndex: -1, // Ensure it stays behind other content
				}}
			/>
			<div
				className="flex flex-col justify-start items-start h-full pt-24 p-5 border overflow-y-auto border-gray-300 shadow-md"
				style={{ width: `${width}px` }} // Apply the dynamic width here
			>
				<ProjectTabs
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					selectedProject={selectedProject}
				/>
				{activeTab === "selection" && (
					<ProjectSelection
						selection={selection}
						setSelection={setSelection}
						projectName={projectName}
						setProjectName={setProjectName}
						projectDescription={projectDescription}
						setProjectDescription={setProjectDescription}
						existingProjects={existingProjects}
						setSelectedProject={setSelectedProject}
						CreateProject={CreateProject}
						handleOpenProject={handleOpenProject}
						handleFetchData={handleFetchData}
						deleteProject={deleteProject}
						fetchProjects={fetchProjects}
					/>
				)}
				{activeTab === "details" && (
					<ProjectDetails
						projectDetails={projectDetails}
						handleOpenNarrative={handleOpenNarrative}
						handleClearSession={handleClearSession}
						handleDownloadCSV={handleDownloadCSV}
						setLocateType={setLocateType}
						setLineName={setLineName}
						lineName={lineName}
						locateType={locateType}
						setLineLength={setLineLength}
						lineLength={lineLength}
						onToggle={handleToggle}

					/>
				)}
				{activeTab === "table" && (
					<ProjectTable
						narrativeLines={projectLines[selectedProject]}
						handleDeleteLine={handleDeleteLine}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						rowsPerPage={rowsPerPage}
						handleOpenNarrative={handleOpenNarrative}
						LocateLine={LocateLine}
						handleFetchData={handleFetchData}
					/>
				)}
			</div>
			<Modal
				showModal={showModal}
				handleCloseModal={handleCloseModal}
				modalContent={modalContent}
			/>
			<ToastContainer containerId="projectToastContainer" />

			<div
				className=" w-1 hover:w-2  bg-[#00309e] hover:bg-blue-500 duration-300  cursor-col-resize"
				onMouseDown={handleMouseDown}
			/>
		</div>
	);
};

export default ProjectMain;
