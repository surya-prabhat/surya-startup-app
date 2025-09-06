import { auth } from "@/app/auth";
import { NextResponse } from "next/server";
import { client, mutationClient } from "@/sanity/lib/client";
import { arrayBuffer } from "stream/consumers";
import { title } from "process";
import { assert } from "console";
import { PortableTextBlock } from "@portabletext/react";


export async function POST(req: Request) {
    try {
        const session = await auth()

        if (!session || !session?.user || !session?.user?.name) {
            return NextResponse.json({ message: 'unauthorized' }, { status: 401 })
        }

        const formData = await req.formData()
        const name = formData.get('name') as string
        const category = formData.get('category') as string
        const description = formData.get('description') as string
        const logoFile = formData.get('logo') as File | null
        const imageFiles = formData.getAll('images') as File[]
        const pitchDetailsString = formData.get('pitchDetails') as string

        if (!name || !description || !category || !logoFile) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
        }

        let author = await mutationClient.fetch(`*[_type == 'author' && handle == $handle][0]`,
            { handle: session.user.name }

        )

        if (!author) {
            const newAuthor = {
                _type: 'author',
                name: session.user.name
            }
            author = await mutationClient.create(newAuthor)
        }

        console.log(session.user.name)

        const uploadPromises = [
            logoFile ? mutationClient.assets.upload('image', Buffer.from(await logoFile.arrayBuffer()), { filename: logoFile.name }) : Promise.resolve(null),
            ...imageFiles.map(async file => mutationClient.assets.upload('image', Buffer.from(await file.arrayBuffer()), { filename: file.name }))
        ]

        const [bannerAsset, ...imageAssets] = await Promise.all(uploadPromises)

        const finalImageAssets = imageAssets.filter(Boolean).map(asset => ({
            _type: 'image',
            asset: {
                _ref: asset!._id
            }
        }));

        const pitchDetails: PortableTextBlock[] = JSON.parse(pitchDetailsString)

        const newStartup = {
            _type: 'startup',
            title: name, description, category,
            banner: bannerAsset ? { _type: 'image', asset: { _ref: bannerAsset._id } } : undefined,
            images: finalImageAssets,
            author: { _ref: author._id },
            viewCount: 0,
            publishedAt: new Date().toISOString(),
            pitchDetails: pitchDetails
        }

        const result = await mutationClient.create(newStartup)

        return NextResponse.json({ message: 'startup SUccessfully Created', startupId: result._id }, { status: 200 })

    } catch (error) {
        console.log("Error Creating Startup", error)
        return NextResponse.json({ message: 'Failed to Create Startup' }, { status: 500 })
    }
}