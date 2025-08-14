import "./CardComponent.css"

import React, { useState } from "react";

interface CardProps {
    title: string;
    category: string;
    publishedDate: string;
    imageUrls: string[];
    imageAlt: string;
    description: string;
    authorName: string;
    authorHandle: string;
    viewCount: number;
    companyImg: {
        imageSrc: string;
        imageAlt: string
    }
    authorImg: {
        imageSrc: string;
        imageAlt: string;
    }
}


const CardComponent: React.FC<CardProps> = ({
    title,
    category,
    publishedDate,
    imageUrls,
    imageAlt,
    description,
    authorHandle,
    authorName,
    viewCount
}) => {

    const [ currentIndex, setCurrentindex] = useState(0)

    const goToPrevious = () => {
        setCurrentindex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : imageUrls.length - 1))
    }
    
    const goToNext = () => {
        setCurrentindex((prevIndex) => (prevIndex < imageUrls.length -1 ? prevIndex + 1 :  0))
    }


    return ( 
        <div className="cardComponent">
            
        </div>
     );
}

export default CardComponent;

