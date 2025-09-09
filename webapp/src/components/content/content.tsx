import './content.less'

export default function Content() {
  return (
    <div className='content-container'>
        <h3>Content</h3>
        <div className="field-container">
            <h3>Field Name</h3>
            <input type="text" placeholder='Value'/>
        </div>
        <div className="field-type-container">
            <h3>Field Type</h3>
            <input type="text" placeholder='Value'/>
        </div>
        <div className="button-container">
				<button>+ Add Field</button>
		</div>
    </div>
  )
};
