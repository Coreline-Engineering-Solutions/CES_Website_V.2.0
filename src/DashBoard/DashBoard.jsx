import { useState } from 'react'
import Main from './Main';
import MenuBar from './MenuBar';
import UserNavbar from './UserNavbar';
import { useLocation } from 'react-router-dom';


function DashBoard() {
	const [isMinimized, setIsMinimized] = useState(false);
	const location = useLocation();
    const username = location.state?.username || location.state?.usernameNar || "";

    console.log("Location state:", location.state);  // Log the state to debug
    console.log("Retrieved username:", username);    // Log the final username value
	
	const toggleMenuBar = () => {
		setIsMinimized(!isMinimized);
	};

	return (
		<>
			<div>
				<UserNavbar _USERNAME={username} />
			</div>
			<div className="flex">
				{/* <MenuBar isMinimized={!isMinimized} toggleMenuBar={toggleMenuBar} _USERNAME={username} /> */}
				<Main isMinimized={!isMinimized} _USERNAME={username} />
			</div>
		</>

	);
}

export default DashBoard