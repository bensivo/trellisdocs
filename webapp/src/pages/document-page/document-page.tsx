import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NavbarComponent } from '../../components/navbar/navbar';
import { actions, atoms } from '../../store/store';
import type { Document } from '../../store/models';

import './document-page.less';

export function DocumentPage() {
    const { 'document-id': documentId } = useParams();
    const [documents] = useAtom(atoms.documents);
    const navigate = useNavigate();

    const [_, updateDocument] = useAtom(actions.updateDocument);

    // Find the document by ID from the URL
    const document = documents.find(d => d.id === Number(documentId));

    // Local state for editable fields
    const [editedDocument, setEditedDocument] = useState<Document | null>(null);
    const [hasChanges, setHasChanges] = useState(false);

    // Update local state when document changes
    useEffect(() => {
        if (document) {
            setEditedDocument(JSON.parse(JSON.stringify(document))); // Deep copy
            setHasChanges(false);
        } else {
            setEditedDocument(null);
            setHasChanges(false);
        }
    }, [document]);

    // Check if there are changes
    useEffect(() => {
        if (!document || !editedDocument) {
            setHasChanges(false);
            return;
        }

        const changed = JSON.stringify(document) !== JSON.stringify(editedDocument);
        setHasChanges(changed);
    }, [document, editedDocument]);

    const handlePropertyFieldChange = (index: number, value: string) => {
        if (!editedDocument) return;
        const newDocument = { ...editedDocument };
        newDocument.property_fields[index] = { ...newDocument.property_fields[index], value };
        setEditedDocument(newDocument);
    };

    const handleContentFieldChange = (index: number, value: string) => {
        if (!editedDocument) return;
        const newDocument = { ...editedDocument };
        newDocument.content_fields[index] = { ...newDocument.content_fields[index], value };
        setEditedDocument(newDocument);
    };

    const handleSave = () => {

        if (!editedDocument) return;
        // TODO: Implement save to store/API
        console.log('Saving document:', editedDocument);
        setHasChanges(false);

        updateDocument(editedDocument.id, editedDocument);


    };

    return (
        <div className="document-page">
            <div className="layout-lr-container">
                <div className="layout-left">
                    <NavbarComponent />
                </div>
                <div className="layout-right">
                    <div className="back-button-container">
                        <button className="back-button" onClick={() => navigate('/documents')}>
                            <i className="ri-arrow-left-line" /> Back to Documents
                            {/* TODO: Going back preserves the view that was there before */}
                        </button>
                    </div>
                    <div className="document-content-wrapper">
                        {editedDocument ? (
                            <>
                                <h3 className="document-preview-title">{editedDocument.name}</h3>
                                <div className="document-properties-container">
                                    <div className="section-header">Properties</div>
                                    <div className="property-fields-container">
                                        {
                                            editedDocument.property_fields.map((field, index) => (
                                                <>
                                                    <label>{field.name}</label>
                                                    <input
                                                        className="document-field-input"
                                                        type="text"
                                                        value={field.value}
                                                        onChange={(e) => handlePropertyFieldChange(index, e.target.value)}
                                                    />
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="document-content-container">
                                    <div className="section-header">Content</div>
                                    <div className="property-fields-container">
                                        {
                                            editedDocument.content_fields.map((field, index) => (
                                                <>
                                                    <label>{field.name}</label>
                                                    <input
                                                        className="document-field-input"
                                                        type="text"
                                                        value={field.value}
                                                        onChange={(e) => handleContentFieldChange(index, e.target.value)}
                                                    />
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="save-button-container">
                                    <button
                                        className="save-button"
                                        disabled={!hasChanges}
                                        onClick={handleSave}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="document-placeholder">
                                <p>Document not found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
