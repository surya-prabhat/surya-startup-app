"use client"

import { useState } from "react";
import "./SearchBar.css"
import { Search } from "lucide-react";



function SearchBar() {

    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = (event: React.FormEvent) => {
        event?.preventDefault()
    }

    return (
        <>
            <form className="search-form" onSubmit={handleSearch}>
                <input 
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                />

                <button
                className="search-btn"
                type="submit"><Search className="search-icon"/></button>
            </form>
            
        </>
    );
}

export default SearchBar;