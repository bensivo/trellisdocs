import { useNavigate } from "react-router-dom";
import "./navbar.less";
import { useAuth } from "react-oidc-context";

export function NavbarComponent() {
	const navigate = useNavigate();
	const auth = useAuth();

	const signoutRedirect = () => {
		auth.removeUser(); // Clears local login state. Should activate login-wrappers if on a restricted page
	};

	return (
		<div className="navbar-component-container">
			<div className="icons-container">
				<img 
					className="logo" 
					src="/trellis-logo-06.svg"
					onClick={() => navigate("/")}
				/>

				<i className="ri-search-line icon"
					onClick={() => navigate("/search")}
				/>

				{/* <i className="ri-file-copy-2-line icon"
					onClick={() => navigate("/documents")}
				/> */}
				{/* <i
					className="ri-folders-line icon"
					onClick={() => navigate("/")}
				/> */}
				{/* <i
					className="ri-file-copy-2-line icon"
					onClick={() => navigate("/template")}
				/> */}
				<i className="ri-shapes-line icon"
					onClick={() => navigate("/integrations")}
				></i>
			</div>
			<div className="logout-container">
				<button onClick={() => signoutRedirect()}>
					<i className="ri-logout-box-line"></i>
				</button>
			</div>
		</div>
	);
}
