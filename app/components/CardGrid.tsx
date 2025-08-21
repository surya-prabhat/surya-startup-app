"use client"

import { title } from "process";
import CardComponent from "./CardComponent";
import "./CardGrid.css"
import FilterBtn from "./FilterBtn";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { startupQuery } from "@/sanity/lib/queries";
import { start } from "repl";
import { urlFor } from "@/sanity/lib/image";


// const startupData = [
//     {
//         title: 'Skill Forge',
//         category: 'Education',
//         publishedDate: '4th Aug',
//         imageUrls: ["/abstract-cover-art-illustration.jpg", "/minimalist-architectural-building-details.jpg", "/view-coffee-cup-with-pastel-colored-background.jpg"],
//         imageAlt: 'Carousel images for Skill Forge',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Fusce fermentum odio nec arcu.',
//         authorName: 'Surya-Prabhat',
//         authorHandle: 'Orion',
//         viewCount: 12002,
//         companyImg: {
//             imageSrc: "/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
//             imageAlt: "Company Img"
//         },
//         authorImg: {
//             imageSrc: "/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
//             imageAlt: "Author Img"
//         },
//         dateCreated: '2025-08-15T10:00:00Z'
//     },
//     {
//         title: 'Innovate Solutions ltd',
//         category: 'Technology',
//         publishedDate: '15th Sep',
//         imageUrls: ["/abstract-cover-art-illustration.jpg", "/minimalist-architectural-building-details.jpg", "/view-coffee-cup-with-pastel-colored-background.jpg"],
//         imageAlt: 'Carousel images for Innovate Solutions',
//         description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//         authorName: 'Priya Sharma',
//         authorHandle: 'TechGuru',
//         viewCount: 14325,
//         companyImg: {
//             imageSrc: "/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
//             imageAlt: "Company Img"
//         },
//         authorImg: {
//             imageSrc: "/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
//             imageAlt: "Author Img"
//         },
//         dateCreated: '2025-08-15T10:00:00Z'
//     },
//     {
//         title: 'Innovate Solutions',
//         category: 'Technology',
//         publishedDate: '15th Sep',
//         imageUrls: ["/abstract-cover-art-illustration.jpg", "/minimalist-architectural-building-details.jpg", "/view-coffee-cup-with-pastel-colored-background.jpg"],
//         imageAlt: 'Carousel images for Innovate Solutions',
//         description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//         authorName: 'Priya Sharma',
//         authorHandle: 'TechGuru',
//         viewCount: 8765,
//         companyImg: {
//             imageSrc: "/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
//             imageAlt: "Company Img"
//         },
//         authorImg: {
//             imageSrc: "/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
//             imageAlt: "Author Img"
//         },
//         dateCreated: '2025-08-19T10:00:00Z'
//     },

// ]

interface CardGridProps {
    searchQuery: string
}

interface Startup {
    _id: string;
    title: string;
    category: string;
    description: string;
    images: { imageUrl: string; alt: string }[];
    authorName: string;
    authorHandle: string;
    authorImage: string;
    viewCount: number;
    publishedAt: string;
    banner: {
        imageUrl: string;
        alt: string;
    }
}

async function getStartups(): Promise<Startup[]> {
    const data = await client.fetch(startupQuery);
    return data
}

function CardGrid({searchQuery}: CardGridProps) {



    const [activeFilter, setActiveFilter] = useState('newest')
    const [startups, setStartups] = useState<Startup[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedStartups = await client.fetch(startupQuery)
                setStartups(fetchedStartups)
            }
            catch (error) {
                console.error("failed to fetch startups", error)
            }
        }
        fetchData()
    }, [])

    const filteredStartups = startups.filter(startup =>
        startup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.authorName.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const sortedData = filteredStartups.sort((a, b) => {
        if (activeFilter === 'newest') {
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        }
        else if (activeFilter === 'popular') {
            return b.viewCount - a.viewCount
        }
        return 0
    })

    return (
        <div className="card-grid">
            <h2 className="all-startups">{searchQuery ? `Search Results for "${searchQuery}"` : "All Start-Ups"}</h2>
            <FilterBtn activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            <div className="cardComponent-grid">
                {sortedData.map((startup) => (

                    <CardComponent 
                        key={startup._id}
                        title={startup.title}
                        category={startup.category}
                        publishedDate={new Date(startup.publishedAt).toLocaleDateString()}
                        imageUrls={startup.images.map((img) => img.imageUrl)}
                        imageAlt={startup.images[0]?.alt || ""}
                        description={startup.description}
                        authorName={startup.authorName}
                        authorHandle={startup.authorHandle}
                        viewCount={startup.viewCount}
                        authorImg= {startup.authorImage}
                        companyImg={{
                            imageSrc: startup.banner.imageUrl,
                            imageAlt: startup.banner.alt
                        }}
                        startupId={startup._id}
                    />
                ))}
            </div>

        </div>
    );
}

export default CardGrid;