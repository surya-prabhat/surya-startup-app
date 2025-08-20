"use client"

import { useState } from "react";
import "./SearchBar.css"
import { Search } from "lucide-react";

interface SearchBarProps {
    
    inputQuery: string
    onInputChange: (query: string) => void
    onSearchSubmit: (event: React.FormEvent) => void
}

function SearchBar({ inputQuery, onInputChange, onSearchSubmit}: SearchBarProps) {



    

    return (
        <>
            <form className="search-form" onSubmit={onSearchSubmit}>
                <input 
                type="text"
                placeholder="Search"
                value={inputQuery}
                onChange={(e) => onInputChange(e.target.value)} 
                />

                <button
                className="search-btn"
                type="submit"><Search className="search-icon"/></button>
            </form>
            
        </>
    );
}

export default SearchBar;