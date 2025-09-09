import { Navbar } from "../../components/Navbar/Navbar";
import { Search } from "../../components/Search/Search";
import { TemplateCard } from "../../components/TemplateCard/TemplateCard";
import "./Template.less";

export function Template() {
	return (
		<div className="templatepage">
			<Navbar />
            <Search />
			<TemplateCard />
		</div>
	);
}
