'use client'

import { useState } from "react";
import "./CreateRightForm.css"
import { PortableTextBlock } from "@portabletext/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

function CreateRightForm() {

    const [form, setForm] = useState<FormState>(initialState)
    const [logo, setLogo] = useState<File | null>(null)
    const {data: session} = useSession()
    const router = useRouter()

    

    return ( 
        <div className="create-right">
            <h1>Hello my jiggers</h1>
        </div>

     );
}

export default CreateRightForm;