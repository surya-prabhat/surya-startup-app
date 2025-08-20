
import { defineType, defineField } from "sanity";

export default defineType({
    name: 'startup',
    title: 'Startup',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string'
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string'
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule) => Rule.max(150).error("The Description must not exceed 200 characters")
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{
                type: 'image',
                options: {
                    hotspot: true
                },
                fields: [
                    defineField({
                        name: 'alt',
                        title: 'Alt text',
                        type: 'string'
                    })
                ]
            }],
            description: 'The carousel images for the startup'
        }),
        defineField({
            name: 'viewCount',
            title: 'View Count',
            type: 'number',
            description: 'The number of views for this post',
            initialValue: 0
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            description: 'the time and date when the startup was published, used for sorting',
            initialValue: () => (new Date().toISOString())
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }]
        }),
        defineField({
            name: 'banner',
            title: 'Banner',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string'
                })
            ]
        })

    ]
})