import "./field-value.less";

export function FieldValueComponent() {
	return (
		<div className="field-value-component-container">
			<p className="field-name">Field Name</p>
			<input type="text" placeholder="Value" className="field-value"/>
		</div>
	);
}
