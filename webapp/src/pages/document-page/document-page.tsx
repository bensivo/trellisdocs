import { useAtom } from 'jotai';
import { useNavigate, useParams } from 'react-router-dom';
import { NavbarComponent } from '../../components/navbar/navbar';
import { atoms } from '../../store/store';

import './document-page.less';

export function DocumentPage() {
    const { 'document-id': documentId } = useParams();
    const [documents] = useAtom(atoms.documents);
    const navigate = useNavigate();

    // Find the document by ID from the URL
    const document = documents.find(d => d.id === Number(documentId));

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
                        {document ? (
                            <>
                                <h3 className="document-preview-title">{document.name}</h3>
                                <div className="document-properties-container">
                                    <div className="section-header">Properties</div>
                                    <div className="property-fields-container">
                                        {
                                            document.property_fields.map(field => (
                                                <>
                                                    <label>{field.name}</label>
                                                    <input className="document-field-input" value={field.value} />
                                                    {/* TODO: Different kinds of inputs based on field type */}
                                                    {/* TODO: Make input fields functional */}
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
                                            document.content_fields.map(field => (
                                                <>
                                                    <label>{field.name}</label>
                                                    <input className="document-field-input" value={field.value} />
                                                    {/* TODO: Different kinds of inputs based on field type */}
                                                    {/* TODO: Make input fields functional */}
                                                </>
                                            ))
                                        }
                                    </div>
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
