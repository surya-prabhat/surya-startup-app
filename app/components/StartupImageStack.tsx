import Image from "next/image"
import "./StartupImageStack.css"
import { useState } from "react";

interface StartupImageStackProps {
    imageUrls: {
        imageUrl: string,
        alt: string
    }[];
    onImageClick: (index: number) => void
}

function StartupImageStack({imageUrls, onImageClick}: StartupImageStackProps) {
    


    return ( 
        <div className="image-stack">
            {imageUrls.map((image, index) => (
                image.imageUrl && (
                    <div className="idea-image-holder" onClick={() => onImageClick(index)} key={index}>
                        <Image
                            src={image.imageUrl}
                            alt= "startup-images"
                            fill
                            className="object-cover"
                        />
                    </div>
                )
            ))}
        </div>
     );
}

export default StartupImageStack;