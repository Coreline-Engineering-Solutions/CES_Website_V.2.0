import { useState } from 'react'
import Main from './Main';
import MenuBar from './MenuBar';
import UserNavbar from './UserNavbar';


function DashBoard() {
	const [isMinimized, setIsMinimized] = useState(false);

	const toggleMenuBar = () => {
		setIsMinimized(!isMinimized);
	};

	return (
		<>
			<div>
				<UserNavbar />
			</div>
			<div className="flex">
				<MenuBar isMinimized={!isMinimized} toggleMenuBar={toggleMenuBar} />
				<Main isMinimized={!isMinimized} />
			</div>
		</>

	);
}

export default DashBoard