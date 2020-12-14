import dynamic from 'next/dynamic'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getFileContent, getFilesInDirectory, renderContentWithPlugins } from '../../utils/mdxUtils'
import path from 'path'
import Post from '../../components/Post'

const components = {
	TestComponent: dynamic(() => import('../../components/TestComponent')),
}

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
	const { content, data } = getFileContent(path.join('posts', decodeURI(params.slug)))

	const mdxSource = await renderContentWithPlugins({ content, data, components })

	return {
		props: {
			source: mdxSource,
			frontMatter: data,
		},
	}
}

export const getStaticPaths = async () => {
	const paths = getFilesInDirectory('posts')
		// Map the path into the static paths object required by Next.js
		.map((slug) => ({ params: { slug: encodeURI(slug.split('/').slice(1).join('/')) } }))

	return {
		paths,
		fallback: false,
	}
}
