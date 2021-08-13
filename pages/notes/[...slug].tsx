import { getFileContent, recursivelyGetFilesInDirectory, renderContentWithPlugins, getFilesWithStructure, PostStructure } from '../../utils/mdxUtils'
import path from 'path'
import Post from '../../components/Post'
import NotesLayout from '../../components/NotesLayout'

interface PostPageProps {
    source: string,
    frontMatter: { [key:string]: string },
    notesStructure: PostStructure[]
}
export default function PostPage({ source = '', frontMatter = {}, notesStructure = [] }: PostPageProps) {
    return (
        <NotesLayout title={frontMatter.title} notesStructure={notesStructure}>
            <div className={"p-8"}>
                <Post {...{ source, frontMatter }} />
            </div>
        </NotesLayout>
    )
}

export async function getStaticProps({ params }) {
    const { content, data } = getFileContent(path.join(process.env.NOTES_PATH, ...params.slug.map(partialSlug => decodeURI(partialSlug))))
    const mdxSource = await renderContentWithPlugins({ content, data })

    const notesStructure = getFilesWithStructure(process.env.NOTES_PATH).children.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()) // latest first
    return {
        props: {
            source: mdxSource,
            frontMatter: data,
            notesStructure
        },
    }
}

export const getStaticPaths = async () => {
    const paths = recursivelyGetFilesInDirectory(process.env.NOTES_PATH)
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug: slug.split('/').slice(1).map(partialSlug => partialSlug) } }))
        
    return {
        paths,
        fallback: false,
    }
}
