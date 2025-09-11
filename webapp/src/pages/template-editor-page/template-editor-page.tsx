import { NavbarComponent } from "../../components/navbar/navbar";
import "./template-editor-page.less";

export function TemplateEditorPage() {
	return (
		<div className="template-editor-container">
			{/* <NavbarComponent />
			<div className="title-container">
				<h3>Templates {">"} Jira Epic</h3>
			</div>
			<Content />
			<Properties /> */}

			
			<div className="layout-lr-container">
				<div className="layout-left">
					<NavbarComponent />
				</div>
				<div className="layout-right">

				</div>
			</div>
		</div>
	);
}
