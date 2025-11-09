import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DynamicFilters } from '../../components/dynamic-filters/dynamic-filters';
import { NavbarComponent } from '../../components/navbar/navbar';
import type { Document } from '../../store/models';
import { actions, atoms } from '../../store/store';

import './documents-page.less';

export function DocumentsPage() {
    const [documents] = useAtom(atoms.documents);
    const [activeDocumentId] = useAtom(atoms.activeDocumentId);
    const [activeDocument] = useAtom(atoms.activeDocument);
    const [, setActiveDocumentId] = useAtom(actions.setActiveDocumentId);
    const [, fetchDocuments] = useAtom(actions.fetchDocuments);

    const [searchText, setSearchText ] = useState('');
    const [visibleDocuments, setVisibleDocuments] = useState<Document[]>([])

    useEffect(() => {
        const visibleDocs = documents.filter(d => {
            const dname = d.name.replace(/\s/, '').toLowerCase();
            const search = searchText.replace(/\s/, '').toLowerCase();

            return dname.includes(search);
        })

        setVisibleDocuments(visibleDocs);

    }, [searchText, documents])
    
    useEffect(() => {
        fetchDocuments();
    }, [])

    return (
        <div className="search-page">
            <div className="layout-lr-container">
                <div className="layout-left">
                    <NavbarComponent />
                </div>
                <div className="layout-right">
                    <div className="searchbar-container">
                        <input className="searchbar" placeholder='Search' value={searchText} onChange={(e)=>setSearchText(e.target.value)}></input>
                    </div>
                    <div className="content-container">
                        <div className="content-left">
                            <div className="refresh-container">
                                <i className="ri-refresh-line refresh-icon"
                                   onClick={() => { 
                                    fetchDocuments();
                                   }}
                                ></i>
                            </div>
                            <DynamicFilters filterOptions={[
                                {
                                    name: 'Gender',
                                    options: ['male', 'female', 'other'],
                                },
                                {
                                    name: 'Age',
                                    'options': ['<18', '18-26', '26-65', '>65'],
                                }
                            ]}/>
                            {/* <div className="filters-container">
                                {[...Array(4)].map((_, i) => (
                                    <select key={i} className="filter" value="Filter">
                                        <option>Foo</option>
                                        <option>Bar</option>
                                        <option>Baz</option>
                                    </select>
                                ))}
                                <button className="add-field-btn">Add <i className="ri-add-line" /></button>
                            </div> */}
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
                                        {visibleDocuments.map((document, _) => (
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
                                        <Link className="document-preview-title" to={`/documents/${activeDocument.id}`}>
                                            {activeDocument.name}
                                            <i className="ri-share-box-line"></i>
                                        </Link>
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