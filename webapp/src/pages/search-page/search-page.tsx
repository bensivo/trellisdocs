

import { useEffect, useState } from 'react';
import { NavbarComponent } from '../../components/navbar/navbar';
import './search-page.less';

export function SearchPage() {
// TODO: read from query params to prefill search box and execute search

    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const query = params.get('query') || "";
        setSearchText(query);
    }, [])

    return (
        <div className="search-page">
            <div className="layout-lr-container">
                <div className="layout-left">
                    <NavbarComponent />
                </div>
                <div className="layout-right">
                    <div className="searchbar-container">
                        <input className="searchbar" placeholder='Search' value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
                    </div>
                    <div className="search-results-container">
                        {[1, 2, 3, 4, 5].map((_, idx) => (
                            <div className="search-result">
                                <div className="search-result-clickable">
                                    <div className="search-result-header">
                                        <div className="search-result-img-container">
                                            <img className="search-result-img" src="https://placehold.co/32x32" />
                                        </div>
                                        <div className="search-result-source">
                                            <span>Data Source</span>
                                            <span>https://doc_url_preview_here</span>
                                        </div>
                                    </div>
                                    <h3 className="search-result-title">Document Title</h3>
                                </div>
                                <div className="search-result-snippet">
                                    This is a preview snippet of the document content where the search terms are highlighted...
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}   