import { NavbarComponent } from "../../components/navbar/navbar";
import { LogoComponent } from "../../components/logo/logo";
import "./homepage.less";

export function HomePage() {
	return (
		<div className="homepage">
			<NavbarComponent />
            <LogoComponent />
		</div>
	);
}
