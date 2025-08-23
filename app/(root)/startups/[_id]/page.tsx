
import { client } from "@/sanity/lib/client";
import { startupQuery, startupQuery_byID } from "@/sanity/lib/queries";
import "./page.css"
import StartupPageClient from "@/app/components/StartupPageClient";

interface Startup {
    _id: string
}

 async function StartupPage({ params }: {params: Promise<{_id: string}>}) {

    const id =  (await params)._id

    console.log(id)

    const startup = await client.fetch(startupQuery_byID, {id})

    console.log(startup)


    return (
        <StartupPageClient
            startup={startup}
        />
    );
}

export default StartupPage;