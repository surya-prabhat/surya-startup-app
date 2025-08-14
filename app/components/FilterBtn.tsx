"use client"

import "./FilterBtn.css"
import React from "react";
import { useState } from "react";



function FilterBtn() {

    const [activeFilter, setActiveFilter] = useState('newest')

    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter)
        // Filter logic to be added
    }

    return (
        <div className="filter-btns">
            <div className="filter-btn-container">
                <button
                onClick={() => handleFilterClick('newest')}
                className= {`${activeFilter === 'newest' ? ("filter-button-active"): ("filter-button-inactive")}`}
                >
                    Newest
                </button>

                <button
                onClick={() => handleFilterClick('popular')}
                className= {`${activeFilter === 'popular' ? ("filter-button-active"): ("filter-button-inactive")}`}
                >
                    Popular
                </button>
            </div>
        </div>
    );
}

export default FilterBtn;