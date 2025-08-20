"use client"

import "./FilterBtn.css"
import React from "react";
import { useState } from "react";

interface FilterProps {
    activeFilter: string;
    setActiveFilter: (filter: string) => void
}

function FilterBtn({activeFilter, setActiveFilter}: FilterProps) {

    return (
        <div className="filter-btns">
            <div className="filter-btn-container">
                <button
                onClick={() => setActiveFilter('newest')}
                className= {`${activeFilter === 'newest' ? ("filter-button-active"): ("filter-button-inactive")}`}
                >
                    Newest
                </button>

                <button
                onClick={() => setActiveFilter('popular')}
                className= {`${activeFilter === 'popular' ? ("filter-button-active"): ("filter-button-inactive")}`}
                >
                    Popular
                </button>
            </div>
        </div>
    );
}

export default FilterBtn;