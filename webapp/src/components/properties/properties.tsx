import "./properties.less";

export function Properties() {
	return (
		<div className="properties-container">
			<div className="properties-box">
				<h3>Properties</h3>
				<div className="field-container">
					<p>Field Name</p>
					<input type="text" placeholder="Value" />
				</div>
				<div className="field-container">
					<p>Field Type</p>
					<input type="text" placeholder="Value" />
				</div>
				<div className="button-container">
					<button>+ Add Field</button>
				</div>
			</div>
		</div>
	);
}
