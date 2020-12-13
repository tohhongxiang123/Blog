import React from 'react'
import { getFileContent, getFilesInDirectory } from '../../utils/mdxUtils'
import Link from 'next/link'
import Layout from '../../components/Layout'

export default function PostList({ posts = [] }) {
    return (
        <Layout title="Posts">
            <div className="max-w-5xl mx-auto p-8">
                <h3>Posts</h3>
                <ul className="list-disc">
                    {posts.map((post) => (
                        <li key={post.filePath}>
                            <Link
                                href={`/${post.filePath}`}
                            >
                                <a>{post.data.title}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    )
}

export function getStaticProps() {
    const postsFilePath = 'posts'
    const posts = getFilesInDirectory(postsFilePath).map((filePath) => {
        const { content, data } = getFileContent(filePath)

        return {
            content,
            data,
            filePath,
        }
    })

    return { props: { posts } }
}