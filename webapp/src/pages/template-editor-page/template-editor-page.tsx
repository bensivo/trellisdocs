import Content from "../../components/content/content";
import { NavbarComponent } from "../../components/navbar/navbar";
import "./template-editor-page.less";

export function TemplateEditorPage() {
	return (
		<div className="template-editor-container">
			<NavbarComponent />
			<div className="title-container">
				<h3>Templates {">"} Jira Epic</h3>
			</div>
			<Content />
		</div>
	);
}
