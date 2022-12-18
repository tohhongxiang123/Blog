import {
    getFileContent,
    recursivelyGetFilesInDirectory,
    renderContentWithPlugins,
    getFilesWithStructure,
} from '../../utils/mdxUtils';
import NotesLayout from '../../components/NotesLayout';
import dynamic from 'next/dynamic';
import { InferGetStaticPropsType } from 'next';

const Post = dynamic(() => import('../../components/Post'), { ssr: false });
export default function PostPage({
    source,
    frontMatter,
    notesStructure = []
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <NotesLayout
            title={frontMatter.title}
            notesStructure={notesStructure}
            description={`Learn more about ${frontMatter.title}`}
        >
            <div className="p-8">
                <Post {...{ source, frontMatter }} />
            </div>
        </NotesLayout>
    );
}

export async function getStaticProps({ params }) {
    const { content, data } = getFileContent(
        [
            process.env.NOTES_PATH,
            ...params.slug.map((partialSlug) => decodeURI(partialSlug))
        ].join('/')
    );
    const mdxSource = await renderContentWithPlugins({ content, data });

    const notesStructure = getFilesWithStructure(
        process.env.NOTES_PATH
    ).children.sort(
        (a, b) =>
            new Date(b.lastModified).getTime() -
            new Date(a.lastModified).getTime()
    ); // latest first

    return {
        props: {
            source: mdxSource,
            frontMatter: data,
            notesStructure
        }
    };
}

export const getStaticPaths = async () => {
    const paths = recursivelyGetFilesInDirectory(process.env.NOTES_PATH)
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({
            params: {
                slug: slug
                    .split('/')
                    .slice(1)
                    .map((partialSlug) => partialSlug)
            }
        }));

    return {
        paths,
        fallback: false
    };
};
