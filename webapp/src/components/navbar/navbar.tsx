import { useNavigate } from "react-router-dom";
import "./navbar.less";

export function NavbarComponent() {
	const navigate = useNavigate();

	return (
		<div className="navbar-container">
			<div className="icons-container">
				<i className="ri-search-line icon"></i>
				<i
					className="ri-folders-line icon"
					style={{ cursor: "pointer" }}
					onClick={() => navigate("/")}
				></i>
				<i
					className="ri-file-copy-2-line icon"
					style={{ cursor: "pointer" }}
					onClick={() => navigate("/template")}
				></i>
				<i className="ri-shapes-line icon"></i>
			</div>
		</div>
	);
}
