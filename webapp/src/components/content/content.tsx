import { ButtonComponent } from "../button/button";
import { FieldValueComponent } from "../field-value/field-value";
import "./content.less";

export function ContentComponent() {
	return (
		<div className="content-component-container">
			<h3 className="content-title">Content</h3>
			<div className="field-value-container">
				<FieldValueComponent />
				<FieldValueComponent />
				<FieldValueComponent />
			</div>
			<div className="button-container">
				<ButtonComponent />
			</div>
		</div>
	);
}
