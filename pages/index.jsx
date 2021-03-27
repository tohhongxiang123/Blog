import Link from 'next/link'
import Layout from '../components/Layout'
import NotePreview from '../components/NotePreview'
import { formatDate } from '../utils/convertDate'
import { getFileContent, getFilesInDirectory, recursivelyGetFilesInDirectory } from '../utils/mdxUtils'

export default function Index({ posts = [], notes = [] }) {
	return (
		<Layout title={"Home"}>
			<div className="max-w-5xl mx-auto p-8">
				<Link href="/posts"><h3 className="cursor-pointer hover:underline">Posts</h3></Link>
				<ul className="list-disc">
					{posts.length > 0 ? posts.map((post) => (
						<li key={post.filePath} className="flex justify-between items-baseline">
							<Link
								as={`/${post.filePath}`}
								href={`/posts/[slug]`}
							>
								<a>{post.data.title}</a>
							</Link>
							<small className="flex-shrink-0">{formatDate(post.data.date)}</small>
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
						<li key={note.filePath} className="mb-8">
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
	}).sort((noteA, noteB) => new Date(noteA.data.date).getTime() - new Date(noteB.data.date).getTime() > 0 ? -1 : 1)

	return { props: { posts, notes } }
}
