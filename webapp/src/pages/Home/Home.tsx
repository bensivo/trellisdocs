import { Logo } from "../../components/Logo/Logo";
import { Navbar } from "../../components/Navbar/Navbar";
import "./Home.less";

export function Home() {
	return (
		<div className="homepage">
			<Navbar />
            <Logo />
		</div>
	);
}
