import React from 'react';
import './sidebar.component.css';
import logo from '../../../assets/logo.png';
import chair from '../../../assets/chair.svg';
import rectangle from '../../../assets/Rectangle33.svg';
import roundImage from '../../../assets/Rating.svg';

const Sidebar = () => {
	return (
		<nav id="sidebar">
			<div className="logo">
				<img src={logo} alt="logo" />
			</div>
			<div className="chair-and-rectangle" style={{ marginTop: 50 }}>
				<img src={chair} alt="chair" width="40px" />
				{/* <img
					src={rectangle}
					alt="rectangle"
					width="6px"
					className="rectangle"
				/> */}
			</div>

			<div className="round-image">
				<img src={roundImage} alt="round image" width="40px" height="40px" />
			</div>
		</nav>
	);
};

export default Sidebar;
