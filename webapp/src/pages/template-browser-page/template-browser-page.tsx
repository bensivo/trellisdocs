import { NavbarComponent } from "../../components/navbar/navbar";
import { SearchComponent } from "../../components/search/search";
import { TemplateCardsComponent } from "../../components/template-cards/template-cards";
import "./template-browser-page.less";

export function TemplateBrowserPage() {
	return (
		<div className="templatepage">
			<div className="layout-lr">
				<div className="layout-left">
					<NavbarComponent/>
				</div>
				<div className="layout-right">
					<SearchComponent/>
					<TemplateCardsComponent/>
				</div>
			</div>
		</div>
	);
}
