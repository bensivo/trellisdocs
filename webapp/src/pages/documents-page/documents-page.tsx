import { useAtom } from 'jotai';
import { NavbarComponent } from '../../components/navbar/navbar';
import { actions, atoms } from '../../store/store';

import './documents-page.less';

export function DocumentsPage() {
    const [documents] = useAtom(atoms.documents);
    const [activeDocumentId] = useAtom(atoms.activeDocumentId);
    const [activeDocument] = useAtom(atoms.activeDocument);
    const [, setActiveDocumentId] = useAtom(actions.setActiveDocumentId);

    return (
        <div className="search-page">
            <div className="layout-lr-container">
                <div className="layout-left">
                    <NavbarComponent />
                </div>
                <div className="layout-right">
                    <div className="searchbar-container">
                        <input className="searchbar" placeholder='Search'></input>
                    </div>
                    <div className="content-container">
                        <div className="content-left">
                            <div className="filters-container">
                                {[...Array(4)].map((_, i) => (
                                    <select key={i} className="filter" value="Filter">
                                        <option>Foo</option>
                                        <option>Bar</option>
                                        <option>Baz</option>
                                    </select>
                                ))}
                                <button className="add-field-btn">Add <i className="ri-add-line" /></button>
                            </div>
                            <div className="table-container">
                                <table className="document-table">
                                    <thead>
                                        <tr>
                                            <th><span>Title</span></th>
                                            <th><span>Type</span></th>
                                            <th><span>Created At</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {documents.map((document, _) => (
                                            <tr className={activeDocumentId > 0 && document.id === activeDocumentId ? 'active' : undefined}
                                                onClick={() => { setActiveDocumentId(document.id) }}
                                            >
                                                <td><span>{document.name}</span></td>
                                                <td><span>TODO</span></td>
                                                <td><span>TODO</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="content-separator"></div>
                        <div className="content-right">
                            {activeDocument ?
                                (
                                    <>
                                        <h3 className="document-preview-title">{activeDocument.name}</h3>
                                        <div className="document-properties-container">
                                            <div className="section-header">Properties</div>
                                            <div className="property-fields-container">
                                                {
                                                    activeDocument.property_fields.map(field => (
                                                        <>
                                                            <label>{field.name}</label>
                                                            <span>{field.value}</span>
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
                                                    activeDocument.content_fields.map(field => (
                                                        <>
                                                            <label>{field.name}</label>
                                                            <span>{field.value}</span>
                                                        </>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </>
                                )
                                :
                                (
                                    <div className="document-placeholder">
                                        <p>Select a document</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}