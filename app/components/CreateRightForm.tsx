'use client'

import { FormEvent, useState } from "react";
import "./CreateRightForm.css"
import { PortableTextBlock } from "@portabletext/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserSession {
    user?: {
        name?: string
        handle?: string
        image?: string

    }
    expires: string
}

interface FormState {
    name: string;
    category: string;
    description: string;
    images: File[]
    pitchDetails: PortableTextBlock[]
}

const initialState: FormState = {
    name: '',
    category: '',
    description: '',
    images: [],
    pitchDetails: [],
}

interface FormProps {
    session: UserSession | null
}

function CreateRightForm() {

    const [form, setForm] = useState<FormState>(initialState)
    const [logo, setLogo] = useState<File | null>(null)
    const router = useRouter()



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        console.log("Description:", form.description)


        const formData = new FormData()
        formData.append('name', form.name)
        formData.append('category', form.category)
        formData.append('description', form.description)
        if (logo) {
            formData.append('logo', logo)
        }
        form.images.forEach((image) => formData.append('images', image))
        formData.append('pitchDetails', JSON.stringify(form.pitchDetails))

        try {
            const response = await fetch('/api/create-startup', {
                method: 'POST',
                body: formData
            })

            if (response.ok) {
                const data = await response.json()
                router.push(`/startups/${data.startupId}`)
            } else {
                const errorData = await response.json()
                console.log("Error Creating Startup:", errorData)
            }
        } catch (error) {
            console.log("Netword Error, failed to create startup", error)
        }

    }


    return (
        <form onSubmit={handleSubmit}>
            <h1>Pitch Your Idea</h1>

            <div>
                <label htmlFor="name">Name of your pitch</label>
                <input 
                type="text"
                id="name"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})} />
            </div>

            <div>
                <label htmlFor="category">Category</label>
                <input 
                type="text"
                id="category"
                name="category"
                value={form.category}
                onChange={(e) => setForm({...form, category: e.target.value})}
                 />
            </div>

            <div>
                <label htmlFor="description">Description</label>
                <textarea 
                id="description"
                name="description"
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
                 />
            </div>

            <div>
                <label htmlFor="logo">Upload Your Logo</label>
                <input 
                type="file"
                id="logo"
                accept="image/*"
                onChange={(e) => setLogo(e.target.files?.[0] || null)} />
            </div>

            <div>
                <label htmlFor="images">Upload Your Images (Max 5)</label>
                <input 
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={(e) => setForm({...form, images: Array.from(e.target.files!).slice(0,5)})} />
            </div>

            <button type="submit">Submit Pitch</button>
        </form>

    );
}

export default CreateRightForm;