import { useState } from 'react'
import Main from './Main';
import MenuBar from './MenuBar';
import UserNavbar from './UserNavbar';
import { useLocation } from 'react-router-dom';


function DashBoard() {
	const [isMinimized, setIsMinimized] = useState(false);
	const location = useLocation();2
	const username = location.state?.username || '';

	const toggleMenuBar = () => {
		setIsMinimized(!isMinimized);
	};

	return (
		<>
			<div>
				<UserNavbar _USERNAME={username} />
			</div>
			<div className="flex">
				<MenuBar isMinimized={!isMinimized} toggleMenuBar={toggleMenuBar} _USERNAME={username} />
				<Main isMinimized={!isMinimized} _USERNAME={username} />
			</div>
		</>

	);
}

export default DashBoard