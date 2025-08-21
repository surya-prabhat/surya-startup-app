import { title } from "process";

interface StartupHeaderProps  {
    title: string;
    publishedAt: string;
    viewCount: number;
    companyImg: string;
    description: string;
    authorImg: string;
    authorName: string;
    authorTag: string;
    category: string;
}

function StartupHeader(
    {
        title,
        publishedAt,
        viewCount,
        companyImg,
        description,
        authorImg,
        authorName,
        authorTag,
        category,
    }: StartupHeaderProps
) {
    return ( 
        <h1>Hello qworld</h1>
     );
}

export default StartupHeader;

