import { ButtonComponent } from "../../components/button/button";
import { CardCollectionComponent } from "../../components/card-collection/card-collection";
import { NavbarComponent } from "../../components/navbar/navbar";
import { SearchComponent } from "../../components/search/search";
import "./template-browser-page.less";

export function TemplateBrowserPage() {
	return (
		<div className="template-browser-page">
			<div className="layout-lr-container">
				<div className="layout-left">
					<NavbarComponent />
				</div>
				<div className="layout-right">
					<SearchComponent />
					<div className="card-collection-container">
						<CardCollectionComponent />
					</div>
					<ButtonComponent />
				</div>
			</div>
		</div>
	);
}
