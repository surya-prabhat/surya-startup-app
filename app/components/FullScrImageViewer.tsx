"use client"

import { useState } from "react";
import Image from "next/image";
import "./FullScrImageViewer.css"
import { ChevronLeft, ChevronRight, X } from "lucide-react";


interface FullScrImageViewer {
    imageUrls: {
        imageUrl: string,
        alt: string
    }[];
    initialIndex: number;
    onClose: () => void;
}


function FullScrImageViewer({ imageUrls, initialIndex, onClose }: FullScrImageViewer) {

    const [currentindex, setCurrentIndex] = useState(initialIndex)

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1))
    }

    const currentImage = imageUrls[currentindex]


    return (
        <div className="full-screen-viewer" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()}>
                <p className="idea-close">Click anywhere to close</p>

                <div className="idea-button-div">
                    <button className="idea-prev-button" onClick={goToPrev}>
                        <ChevronLeft className="text-white" />
                    </button>
                    <button className="idea-next-button" onClick={goToNext}>
                        <ChevronRight className="text-white" />
                    </button>
                </div>

                <div className="expanded-image">
                    <Image
                        src={currentImage.imageUrl}
                        alt="image-expanded"
                        fill
                        className="object-contain bg-black"
                    />
                </div>

            </div>
        </div>
    );
}

export default FullScrImageViewer;