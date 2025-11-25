import { useState } from 'react';
import { NavbarComponent } from '../../components/navbar/navbar';

import './home-page.less';
import { useNavigate } from 'react-router-dom';

export function HomePage() {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const onSubmit = () => {
        navigate(`/search?query=${encodeURIComponent(search)}`);
    }

    return (
        <div className="home-page">
            <div className="layout-lr-container">
                <div className="layout-left">
                    <NavbarComponent/>
                </div>
                <div className="layout-right">
                    <form className="searchbar-container" onSubmit={(e) => { 
                        e.preventDefault(); 
                        onSubmit(); 
                    }}>
                        <input 
                            className="searchbar" 
                            placeholder="Search" 
                            autoFocus 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)}/>
                        <button className="search-btn" type="submit">
                            <i className="ri-search-line"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
