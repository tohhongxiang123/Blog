import Link from 'next/link'
import Layout from '../components/Layout'
import NotePreview from '../components/NotePreview'
import { formatDate } from '../utils/convertDate'
import { getFileContent, getFilesInDirectory, recursivelyGetFilesInDirectory } from '../utils/mdxUtils'

export default function Index({ posts = [], notes = [] }) {
	return (
		<Layout title={"Home"}>
			<div>
				<div className="text-center flex flex-col p-20">
					<h1 className="text-7xl">Toh Hong Xiang</h1>
					<p className="opacity-80">Web Developer, studying in NTU</p>
					<ul className="flex flex-wrap justify-center p-0">
						<li><a href="https://github.com/tohhongxiang123" target="_blank" rel="noopener noreferrer"><img className="opacity-60 hover:opacity-100 cursor-pointer m-4" src="/icons/github.svg" width={64} height={64} /></a></li>
						<li><a href="https://www.linkedin.com/in/toh-hong-xiang-31551118b/" target="_blank" rel="noopener noreferrer"><img className="opacity-60 hover:opacity-100 cursor-pointer m-4" src="/icons/linkedin.svg" width={64} height={64} /></a></li>
					</ul>
				</div>
				<div className="max-w-5xl mx-auto p-8 px-16">
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
