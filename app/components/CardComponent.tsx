"use client"

import "./CardComponent.css"
import Image from "next/image";
import { ChevronLeft, ChevronRight, Eye, ArrowBigUp } from "lucide-react";

import React, { useEffect, useState } from "react";
import { auth } from "../auth";
import { useResizeFontOnOverflow } from "../hooks/useResizeFontOnOverflow";
import Link from "next/link";
import { useRouter } from "next/navigation";



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
    authorImg: string
    startupId: string
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
    viewCount,
    companyImg,
    authorImg,
    startupId
}) => {

    const { elementRef, fontSize } = useResizeFontOnOverflow()

    const [currentIndex, setCurrentindex] = useState(0)

    const goToPrevious = () => {
        setCurrentindex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : imageUrls.length - 1))
    }

    const goToNext = () => {
        setCurrentindex((prevIndex) => (prevIndex < imageUrls.length - 1 ? prevIndex + 1 : 0))
    }


    const updateViewCounter = async (startupId: string) => {
        try {
            await fetch('/api/viewCount', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ startupId })
            })
        } catch (error) {
            console.log("An error occured, view count", error)
        }
    }

    const router = useRouter()
    const handleCLick = async(e: React.MouseEvent<HTMLAnchorElement>) =>{
        e.preventDefault()

       await updateViewCounter(startupId)

       router.push(`startups/${startupId}`)
    }


    return (
        <div className="cardComponent">
            <div className="company-info">
                <div className="company-name-img">
                    <Link onClick={handleCLick} href={`/startups/${startupId}`}>
                        <h3 className="company-title">{title}</h3>
                    </Link>
                    <div className="company-img">
                        <Image
                            className="object-cover"
                            src={companyImg.imageSrc}
                            alt="company img"
                            fill />
                    </div>
                </div>
                <div className="cat-and-publish">
                    <p className="category">{category}</p>
                    <p className="publish-date">Published On: {publishedDate}</p>
                </div>
            </div>

            <div className="image-carousel">
                {imageUrls.length > 0 && (
                    <Image
                        key={currentIndex}
                        src={imageUrls?.[currentIndex]}
                        alt={`${imageAlt} - Image ${currentIndex - 1}`}
                        fill
                        className="object-cover"
                    />
                )}
                {imageUrls.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="previous-btn"
                        ><ChevronLeft className="text-white" /></button>
                        <button
                            onClick={goToNext}
                            className="next-btn"
                        ><ChevronRight className="text-white" /></button>
                    </>
                )}
            </div>

            <div className="description">{description}</div>

            <div className="author-info-views">
                <div className="author-info">
                    <div className="author-image">
                        <Image
                            src={authorImg}
                            alt="Author Image"
                            fill
                            className="object-cover"
                        />
                    </div>


                    <div className="author">
                        <p className="author-name">{authorName}</p>
                        <p className="author-tag">@{authorHandle}</p>
                    </div>
                </div>

                <div className="views"><Eye /> {viewCount}</div>
            </div>

            <button className="upvote">
                <ArrowBigUp /> Upvote
            </button>

        </div>
    );
}

export default CardComponent;

