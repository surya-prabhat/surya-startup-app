export const startupQuery = `
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
    "authorImage": author->image {
      "imageUrl": asset->url,
        alt
    },
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