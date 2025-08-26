import { auth } from "@/app/auth";
import { NextResponse } from "next/server";
import { client, mutationClient } from "@/sanity/lib/client";
import { arrayBuffer } from "stream/consumers";
import { title } from "process";
import { assert } from "console";


export async function POST(req: Request) {
    try {
        const session = await auth()

        if (!session || !session?.user || !session?.user?.name) {
            return NextResponse.json({message: 'unauthorized'}, {status: 401})
        }

        const formData = await req.formData()
        const name = formData.get('name') as string
        const category = formData.get('category') as string
        const description = formData.get('description') as string
        const logoFile = formData.get('logo') as File | null
        const imageFiles = formData.getAll('images') as File[]
        const pitchDetails = formData.get('pitchDetails') as string

        if (!name || !description || !category || !logoFile) {
            return NextResponse.json({ message: 'Missing required fields'}, {status: 400})
        }

        const author = await mutationClient.fetch(`*[_type == 'author' && handle == $handle][0]`,
            {handle: session.user.name}
        )

        let bannerAsset
        if (logoFile) {
            const arrayBuffer = await logoFile.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            bannerAsset = await mutationClient.assets.upload('image', buffer, {filename: logoFile.name})
        }

        const imageAssets = []
        for (const file of imageFiles) {
            const arrayBuffer = await file.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            const assetResponse = await mutationClient.assets.upload('image', buffer, {filename: file.name})
            imageAssets.push({_type: 'image', asset: {_ref: assetResponse._id}})
        }

        const newStartup = {
            _type: 'startup',
            title: name, description, category,
            banner: bannerAsset? {_type: 'image', asset: {_ref: bannerAsset._id}} : undefined,
            images: imageAssets,
            pitchDetails: JSON.parse(pitchDetails),
            author: {_ref: author._id},
            viewCount: 0,
            publishedAt: new Date().toISOString()
        }

        const result = await mutationClient.create(newStartup)

        return NextResponse.json({message: 'startup SUccessfully Created', startupId: result._id}, {status: 200})

    } catch (error) {
        console.log("Error Creating Startup", error)
        return NextResponse.json({message: 'Failed to Create Startup'}, {status: 500})
    }
}