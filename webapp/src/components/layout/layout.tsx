import { NavbarComponent } from "../navbar/navbar";
import "./layout.less";

export function LayoutComponent() {
	return (
		<div className="layout-lr-container">
			<div className="layout-left">
				<NavbarComponent/>
			</div>
			<div className="layout-right"></div>
		</div>
	);
}
