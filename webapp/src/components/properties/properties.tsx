import { ButtonComponent } from "../button/button";
import { FieldValueComponent } from "../field-value/field-value";
import "./properties.less";

export function PropertiesComponent() {
	return (
		<div className="properties-component-container">
			<h3 className="properties-title">Properties</h3>
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
