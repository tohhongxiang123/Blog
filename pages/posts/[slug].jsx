import dynamic from 'next/dynamic'
import Layout from '../../components/Layout'
import { getFileContent, getFilesInDirectory, renderContentWithPlugins } from '../../utils/mdxUtils'
import path from 'path'
import Post from '../../components/Post'

export default function PostPage({ source = '', frontMatter = {} }) {
	return (
		<Layout title={frontMatter.title}>
			<div className={"p-8"}>
				<Post {...{ source, frontMatter }} />
			</div>
		</Layout>
	)
}

export const getStaticProps = async ({ params }) => {
	const { content, data } = getFileContent(path.join(process.env.POSTS_PATH, params.slug))

	const mdxSource = await renderContentWithPlugins({ content, data })

	return {
		props: {
			source: mdxSource,
			frontMatter: data,
		},
	}
}

export const getStaticPaths = async () => {
	const paths = getFilesInDirectory(process.env.POSTS_PATH)
		// Map the path into the static paths object required by Next.js
		.map((slug) => ({ params: { slug: slug.split('/').slice(1).join('/') } }))

	return {
		paths,
		fallback: false,
	}
}
