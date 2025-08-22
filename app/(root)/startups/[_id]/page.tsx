import StartupHeader from "@/app/components/StartupHeader";
import { client } from "@/sanity/lib/client";
import { startupQuery, startupQuery_byID } from "@/sanity/lib/queries";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { start } from "repl";
import "./page.css"
import StartupImageStack from "@/app/components/StartupImageStack";

interface SanityImages {
    imageUrl: string;
    alt: string
}

async function StartupPage({ params }: {params: Promise<{_id: string}>}) {

    const id = (await params)._id

    const startup = await client.fetch(startupQuery_byID, {id})
    
    const imageUrls = startup.images.map((image: SanityImages) => ({
        imageUrl: image.imageUrl,
        alt: image.alt
    }))
    return (
        <div className="startup-page">
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
            />
        </div>
    );
}

export default StartupPage;