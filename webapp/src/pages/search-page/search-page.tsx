

import { useEffect, useState } from 'react';
import { NavbarComponent } from '../../components/navbar/navbar';
import './search-page.less';
import { DynamicFilters } from '../../components/dynamic-filters/dynamic-filters';
import { useNavigate } from 'react-router-dom';

export function SearchPage() {
// TODO: read from query params to prefill search box and execute search
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

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
                    <form className="searchbar-container" onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/search?query=${encodeURIComponent(searchText)}`);
                    }}>
                        <input className="searchbar" placeholder='Search' value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
                        <button className="search-btn" type="submit">
                            <i className="ri-search-line"></i>
                        </button>
                    </form>
                    <div className="filters-container">
                        <DynamicFilters filterOptions={[
                            { name: "Source", options: ["Email", "Google Drive", "Dropbox"] },
                            { name: "Author", options: ["Ben", "Austin", "Brandon"] },
                        ]} onChange={() => {}}/>
                    </div>
                    <div className="search-results-container">
                        {[1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,].map((_, idx) => (
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