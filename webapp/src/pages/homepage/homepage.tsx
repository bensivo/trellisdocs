import { LogoComponent } from "../../components/logo/logo";
import { NavbarComponent } from "../../components/navbar/navbar";
import "./homepage.less";

export function HomePage() {
	return (
		<div className="homepage">
			<div className="layout-lr-container">
				<div className="layout-left">
					<NavbarComponent />
				</div>
				<div className="layout-right">
					<LogoComponent />
				</div>
			</div>
		</div>
	);
}
