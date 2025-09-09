import "./Navbar.less";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router-dom";

export function Navbar() {
	const navigate = useNavigate();

	return (
		<div className="navbar-container">
			<div className="icons-container">
				<i className="ri-search-line"></i>
				<i
					className="ri-folders-line"
					style={{ cursor: "pointer" }}
					onClick={() => navigate("/")}
				></i>
				<i
					className="ri-file-copy-2-line"
					style={{ cursor: "pointer" }}
					onClick={() => navigate("/template")}
				></i>
				<i className="ri-shapes-line"></i>
			</div>
		</div>
	);
}
