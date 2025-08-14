import "./CardGrid.css"
import FilterBtn from "./FilterBtn";

function CardGrid() {
    return (
        <div className="card-grid">
            <h2 className="all-startups">All Start-Ups</h2>
            <FilterBtn/>

        </div>
    );
}

export default CardGrid;