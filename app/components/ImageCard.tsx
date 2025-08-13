import Image from "next/image";
import React from "react";
import "./ImageCard.css"

// Image component props

interface ImageCardProps {
    imageSrc: string;
    altText: string;
}

function ImageCard({ imageSrc, altText }: ImageCardProps) {
    return ( 
        <div className="image-card">
            <div className="image">
                <Image 
                src={imageSrc}
                alt={altText}
                fill
                style={{objectFit: 'cover'}}
                />


            </div>
        </div>
     );
}

export default ImageCard;