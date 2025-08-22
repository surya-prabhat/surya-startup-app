import { groq } from "next-sanity";


export const startupQuery = groq`
    *[_type == "startup"] {
    _id,
    title,
    category,
    description,
    images[] {
      "imageUrl": asset->url,
      alt
    },
    "authorName": author->name,
    "authorHandle": author->handle,
    "authorImage": author->profileImage,
    viewCount,
    upvotes,
    comments,
    publishedAt,
    "banner": banner {
        "imageUrl": asset->url,
        alt
    }
  }
`

export const startupQuery_byID = groq`
    *[_type == "startup" && _id == $id][0] {
    _id,
    title,
    category,
    description,
    images[] {
      "imageUrl": asset->url,
      alt
    },
    "authorName": author->name,
    "authorHandle": author->handle,
    "authorImage": author->profileImage,
    viewCount,
    upvotes,
    comments,
    publishedAt,
    "banner": banner {
        "imageUrl": asset->url,
        alt
    }
  }
`