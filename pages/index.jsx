import Link from 'next/link'
import Layout from '../components/Layout'
import NotePreview from '../components/NotePreview'
import { getFileContent, getFilesInDirectory, recursivelyGetFilesInDirectory } from '../utils/mdxUtils'

export default function Index({ posts = [], notes = [] }) {
	return (
		<Layout title={"Home"}>
			<div className="max-w-5xl mx-auto p-8">
				<Link href="/posts"><h3 className="cursor-pointer hover:underline">Posts</h3></Link>
				<ul className="list-disc">
					{posts.length > 0 ? posts.map((post) => (
						<li key={post.filePath}>
							<Link
								as={`/${post.filePath}`}
								href={`/posts/[slug]`}
							>
								<a>{post.data.title}</a>
							</Link>
						</li>
					)) : (
						<li>
							No posts
						</li>
					)}
				</ul>
				<Link href={"/notes"}><h3 className="cursor-pointer hover:underline">Notes</h3></Link>
				<ul className="list-disc">
					{notes.length > 0 ? notes.map((note) => (
						<li key={note.filePath}>
							<NotePreview {...note} />
						</li>
					)) : (
						<li>
							No notes
						</li>
					)}
				</ul>
			</div>
		</Layout>
	)
}

export function getStaticProps() {
	const posts = getFilesInDirectory(process.env.POSTS_PATH).map((filePath) => {
		const { content, data } = getFileContent(filePath)

		return {
			content,
			data,
			filePath,
		}
	})

	const notes = recursivelyGetFilesInDirectory(process.env.NOTES_PATH).map((filePath) => {
		const { content, data } = getFileContent(filePath)

		return {
			content,
			data,
			filePath,
		}
	})

	return { props: { posts, notes } }
}
