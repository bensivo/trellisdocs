import { ContentComponent } from "../../components/content/content";
import { NavbarComponent } from "../../components/navbar/navbar";
import "./template-editor-page.less";

export function TemplateEditorPage() {
	return (
		<div className="template-editor-container">
			<div className="layout-lr-container">
				<div className="layout-left">
					<NavbarComponent />
				</div>
				<div className="layout-right">
					<div className="te-title">{"Templates > Jira Epic"}</div>
					<ContentComponent/>
				</div>
			</div>
		</div>
	);
}
