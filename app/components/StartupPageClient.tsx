"use client"

import { useState, useEffect } from "react"
import { client } from "@/sanity/lib/client"
import { startupQuery_byID} from "@/sanity/lib/queries"
import StartupHeader from "./StartupHeader";
import StartupImageStack from "./StartupImageStack";
import FullScrImageViewer from "./FullScrImageViewer";
import PitchDetails from "./PitchDetails";



interface SanityImages {
    imageUrl: string;
    alt: string
}

interface Startup {
    id: string
}

interface StartupPageClientProps {
    startup: Startup
}


function StartupPageClient({ startup }: StartupPageClientProps) {

    console.log(startup)
    
    const imageUrls = startup.images.map((image: SanityImages) => ({
        imageUrl: image.imageUrl,
        alt: image.alt
    }))

    const [viewerOpen, setViewerOpen] = useState(false)
    const [initialIndex, setInitialIndex] = useState(0)

    const openViewer = (index: number) => {
        setInitialIndex(index)
        setViewerOpen(true)
    }

    const closeViewer = () => {
        setViewerOpen(false)
    }


    return (
        <div className="startup-page ">
            <StartupHeader
                title= {startup.title}
                publishedAt= {startup.publishedAt}
                viewCount = {startup.viewCount}
                companyImg = {startup.banner.imageUrl}
                description = {startup.description}
                authorImg = {startup.authorImage}
                authorName = {startup.authorName}
                authorTag = {startup.authorHandle}
                category = {startup.category}

            />

            <StartupImageStack
                imageUrls={imageUrls}
                onImageClick={openViewer}
            />

            {viewerOpen && (
                <FullScrImageViewer
                    imageUrls={imageUrls}
                    initialIndex={initialIndex}
                    onClose={closeViewer}
                    />
            )}

            <PitchDetails pitchDetails={startup.pitchDetails}/>

        </div>
    );
}

export default StartupPageClient;