import StartupHeader from "@/app/components/StartupHeader";
import { client } from "@/sanity/lib/client";
import { startupQuery } from "@/sanity/lib/queries";
import { start } from "repl";

interface Props {
    params: {
        _id: string
    }

}

async function StartupPage({ params }: Props) {

    const { _id } = params

    const startup = await client.fetch(startupQuery, { id: _id })

    console.log(startup)

    return (
        <div>
            <StartupHeader
                title= {startup.title}
                publishedAt= {startup.publishedAt}
                viewCount = {startup.viewCount}
                companyImg = {startup.imageUrl}
                description = {startup.description}
                authorImg = {startup.authorImage}
                authorName = {startup.authorName}
                authorTag = {startup.authorHandle}
                category = {startup.category}
            />
        </div>
    );
}

export default StartupPage;