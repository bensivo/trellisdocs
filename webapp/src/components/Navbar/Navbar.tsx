import "./Navbar.less";
import "remixicon/fonts/remixicon.css";

export function Navbar() {
	return (
		<div className="navbar-container">
			<div className="icons-container">
				<i className="ri-search-line"></i>
				<i className="ri-folders-line"></i>
				<i className="ri-file-copy-2-line"></i>
				<i className="ri-shapes-line"></i>
			</div>
		</div>
	);
}
