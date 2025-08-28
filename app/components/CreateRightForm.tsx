'use client'

import { useState } from "react";
import "./CreateRightForm.css"
import { useRouter } from "next/navigation";
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css';
import { convertHtmlToPortableText } from "../utils/portableTextConvertor";


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
    pitchDetails: string
}

const initialState: FormState = {
    name: '',
    category: '',
    description: '',
    images: [],
    pitchDetails: '',

}

// Simple function to convert HTML to Portable Text blocks



function CreateRightForm() {

    const [form, setForm] = useState<FormState>(initialState)
    const [logo, setLogo] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const handlePitchDetailsChange = (html: string) => {
        setForm(prevForm => ({ ...prevForm, pitchDetails: html }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsSubmitting(true)

        const blocks = convertHtmlToPortableText(form.pitchDetails)


        const formData = new FormData()
        formData.append('name', form.name)
        formData.append('category', form.category)
        formData.append('description', form.description)
        if (logo) {
            formData.append('logo', logo)
        }
        form.images.forEach((image) => formData.append('images', image))
        formData.append('pitchDetails', JSON.stringify(blocks))

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
        } finally {
            setIsSubmitting(false)
        }

    }


    return (
        <form className="create-right-form" onSubmit={handleSubmit}>
            <h1 className="pitch-your-idea">Pitch Your Idea</h1>

            <div className="form-namecat">
                <div className="form-description">


                    <label className="create-right-label" htmlFor="name">Name of your pitch</label>
                    <input
                        className="create-right-namecat"
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })} />

                </div>

                <div className="form-description">
                    <label className="create-right-label" htmlFor="category">Category</label>
                    <input
                        className="create-right-namecat"
                        type="text"
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />
                </div>
            </div>

            <div className="create-right-logo">
                <label className="create-right-label" htmlFor="logo">Upload Your Logo</label>
                <input
                    className="create-right-namecat"
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={(e) => setLogo(e.target.files?.[0] || null)} />
                {logo && <span className="file-name">{logo.name}</span>}
                {!logo && <span className="file-name">No file chosen</span>}
            </div>



            <div className="form-description">
                <label className="create-right-label" htmlFor="description">Description</label>
                <textarea
                    className="create-right-description"
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
            </div>

            <div className="form-description">
                <label className="create-right-label" htmlFor="images">Upload Your Images (Max 5)</label>
                <input
                    className="create-right-namecat"
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    onChange={(e) => setForm({ ...form, images: Array.from(e.target.files!).slice(0, 5) })} />
                {form.images.length > 0 && (
                    <span className="file-name">
                        {form.images.length} file(s) chosen
                    </span>
                )}
                {form.images.length === 0 && (
                    <span className="file-name">No files chosen</span>
                )}
            </div>

            <div className="form-description">
                <label className="create-right-label" htmlFor="pitchDetails">Pitch Details</label>
                <ReactQuill
                    theme="snow"
                    value={form.pitchDetails}
                    onChange={handlePitchDetailsChange}
                />

            </div>

            <button className="submit-button" type="submit" disabled={isSubmitting}>
                {isSubmitting? 'Submitting...': "Submit Pitch"}
            </button>
        </form>

    );
}

export default CreateRightForm;