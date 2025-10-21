import { useState } from "react";

import './editable-header.less';

export interface EditableHeaderProps {
    /**
     * The current value of the header.
     */
    value: string;

    /**
     * Callback called when the header is edited inline (on submission)
     *
     * @param newValue
     * @returns 
     */
    onChange: (newValue: string) => void; // Callback for when the value changes
}

/**
 * A H3 header element that can be edited by clicking on the inline 'edit' icon.
 */
export function EditableHeader(props: EditableHeaderProps) {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [value, setValue] = useState(props.value); // Local state for the input value

    return (
        <div className="editable-header">
            {
                !isEditingTitle ? (
                    <h3>
                        {props.value}
                        <i className="ri-edit-line" onClick={() => setIsEditingTitle(true)} />
                    </h3>
                ) : (
                    <form onSubmit={(e) => { // Using a form allows submission with just the 'Enter' button
                        e.preventDefault();
                        setIsEditingTitle(false);
                        props.onChange(value);
                    }}>
                        <input
                            className="editable-header-input"
                            type="text"
                            value={value}
                            autoFocus={true}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <i className="ri-check-line document-input-check" onClick={() => {
                            setIsEditingTitle(false)
                            props.onChange(value);
                        }} />
                    </form>
                )
            }
        </div>
    )
}