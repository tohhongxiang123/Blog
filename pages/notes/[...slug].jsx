import dynamic from 'next/dynamic'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getFileContent, recursivelyGetFilesInDirectory, renderContentWithPlugins, getFilesWithStructure } from '../../utils/mdxUtils'
import path from 'path'
import Post from '../../components/Post'
import styles from './index.module.scss'
import NestedDirectoryNavigation from '../../components/NestedDirectoryNavigation'
import NotesLayout from './_NotesLayout'

const components = {
    TestComponent: dynamic(() => import('../../components/TestComponent')),
}

export default function PostPage({ source, frontMatter, notesStructure }) {
    return (
        <NotesLayout title={frontMatter.title} notesStructure={notesStructure}>
            <div className={"p-8"}>
                <Post {...{ source, frontMatter }} />
            </div>
        </NotesLayout>
    )
}

export async function getStaticProps({ params }) {
    const { content, data } = getFileContent(path.join('notes', ...params.slug.map(partialSlug => decodeURI(partialSlug))))
    const mdxSource = await renderContentWithPlugins({ content, data, components })

    const notesStructure = getFilesWithStructure('notes').children
    return {
        props: {
            source: mdxSource,
            frontMatter: data,
            notesStructure
        },
    }
}

export const getStaticPaths = async () => {
    const paths = recursivelyGetFilesInDirectory('notes')
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug: slug.split('\\').slice(1).map(partialSlug => encodeURI(partialSlug)) } }))

    return {
        paths,
        fallback: false,
    }
}
