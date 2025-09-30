
import { NavbarComponent } from '../../components/navbar/navbar';

import './search-page.less';

export function SearchPage() {
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
                                <button className="add-field-btn">Add <i className="ri-add-line"/></button>
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
                                        {[...Array(10)].map((_, i) => (
                                            <tr onClick={() => {console.log('Click!')}}>
                                                <td><span>Document Title</span></td>
                                                <td><span>Jira Story</span></td>
                                                <td><span>1970-01-01</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="content-separator"></div>
                        <div className="content-right">
                            <h3 className="document-preview-title">Meeting with Alice</h3>
                            <div className="document-properties-container">
                                <div className="section-header">Properties</div>
                                <div className="property-fields-container">
                                    <label>Date</label>
                                    <span>1980-01-01</span>
                                    <label>Project</label>
                                    <span>2026 Budget Planning</span>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="document-content-container">
                                <div className="section-header">Content</div>
                                <div className="property-fields-container">
                                    <label>Date</label>
                                    <span>1980-01-01</span>
                                    <label>Project</label>
                                    <span>2026 Budget Planning</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}