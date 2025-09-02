import { Eye } from "lucide-react";
import { title } from "process";
import Image from "next/image";
import "./StartupHeader.css"

interface StartupHeaderProps {
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

    console.log(companyImg)
    return (
        <div className="idea-header">
            <div className="date-and-views">
                <p className="idea-date">Published On: {new Date(publishedAt).toLocaleDateString()}</p>
                <p className="idea-viewCount"><Eye /> {viewCount}</p>
            </div>

            <div className="idea-company-details">

                <div className="img-name">
                    <div className="idea-company-img">
                        <Image
                            className="object-cover"
                            src={companyImg}
                            alt="Startup Image"
                            fill
                        />
                    </div>
                    <h1 className="idea-name">{title}</h1>
                </div>

                <div className="idea-author-details">
                    <div className="idea-author-img">
                        <Image
                            src={authorImg}
                            alt="Author Img"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="idea-author-name">
                        <h3 className="idea-author">{authorName}</h3>
                        <p className="idea-author-tag">@{authorTag}</p>
                    </div>
                </div>
            </div>

            <div className="idea-description-category">
                <p className="idea-description">{description}</p>
                <div className="idea-category">{category}</div>
            </div>
        </div>

    );
}

export default StartupHeader;

