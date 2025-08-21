import { defineType, defineField } from "sanity";

export default defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        defineField({
            name: 'githubId',
            title: 'Github Username',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'profileImage',
            title: 'Image',
            type: 'url',
        }),
        defineField({
            name: 'handle',
            title: 'Handle',
            type: 'string'
        })
        
    ]
})