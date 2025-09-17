import { ContentComponent } from "../../components/content/content";
import { NavbarComponent } from "../../components/navbar/navbar";
import { PropertiesComponent } from "../../components/properties/properties";
import "./template-editor-page.less";

export function TemplateEditorPage() {
	return (
		<div className="template-editor-page">
			<div className="layout-lr-container">
				<div className="layout-left">
					<NavbarComponent />
				</div>
				<div className="layout-right">
					<div className="title-container">
						<h3 className="title">{"Templates > Jira Epic"}</h3>
					</div>
					<div className="content-container">
						<ContentComponent />
					</div>
					<div className="properties-container">
						<PropertiesComponent />
					</div>
				</div>
			</div>
		</div>
	);
}
