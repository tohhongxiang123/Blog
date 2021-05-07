import Link from "next/link";
import Layout from "../components/Layout";
import NotePreview from "../components/NotePreview";
import PostPreview from "../components/PostPreview";
import WaveContainer from "../components/WaveContainer";
import {
	getFileContent,
	getFilesInDirectory,
	recursivelyGetFilesInDirectory,
} from "../utils/mdxUtils";

export default function Index({ posts = [], notes = [] }) {
	return (
		<Layout title={"Home"}>
			<div>
				<WaveContainer
					top={false}
					className="z-10 -mb-16 sm:-mb-32 md:-mb-48 lg:-mb-64 xl:-mb-72 2xl:-mb-96"
				>
					<div className="p-8 pt-32 text-center flex flex-col items-center">
						<img src="code_thinking.svg" width={512} height={512} className="mb-8" alt="logo" />
						<h1 className="text-7xl font-bold mb-4">
							Toh Hong Xiang
						</h1>
						<p className="opacity-80 font-semibold tracking-wide">
							Web Developer, studying in NTU
						</p>
						<ul className="flex flex-wrap justify-center p-0">
							<li>
								<a
									href="https://github.com/tohhongxiang123"
									target="_blank"
									rel="noopener noreferrer"
									className="flex flex-col text-center items-center opacity-60 hover:opacity-100 transform hover:-translate-y-0.5 transition-all duration-75 cursor-pointer"
								>
									<img
										className="m-4 mb-0"
										src="/icons/github.svg"
										width={64}
										height={64}
										alt="Github"
									/>
									<p className="font-semibold">Github</p>
								</a>
							</li>
							<li>
								<a
									href="https://www.linkedin.com/in/toh-hong-xiang-31551118b/"
									target="_blank"
									rel="noopener noreferrer"
									className="flex flex-col text-center items-center opacity-60 hover:opacity-100 transform hover:-translate-y-0.5 transition-all duration-75 cursor-pointer"
								>
									<img
										className="m-4 mb-0"
										src="/icons/linkedin.svg"
										width={64}
										height={64}
										alt="LinkedIn"
									/>
									<p className="font-semibold">LinkedIn</p>
								</a>
							</li>
							<li>
								<a
									href="resume.pdf"
									target="_blank"
									rel="noopener noreferrer"
									className="flex flex-col text-center items-center opacity-60 hover:opacity-100 transform hover:-translate-y-0.5 transition-all duration-75 cursor-pointer"
									download
								>
									<img
										className="m-4 mb-0"
										src="/icons/resume.svg"
										width={64}
										height={64}
										alt="Resume"
									/>
									<p className="font-semibold">Resume</p>
								</a>
							</li>
						</ul>
					</div>
				</WaveContainer>
				<div className="m-8">
					<section className="relative z-10 max-w-3xl mx-auto mb-8 p-8 pt-4 rounded-md shadow-md hover:shadow-lg transition-all duration-75 bg-white">
						<Link href="/posts">
							<h2 className="cursor-pointer hover:underline text-3xl font-bold mb-6">
								Recent Posts
							</h2>
						</Link>
						<ul>
							{posts.length > 0 ? (
								posts.map((post) => (
									<li key={post.filePath} className="mb-4">
										<PostPreview {...post} />
									</li>
								))
							) : (
								<li>No posts</li>
							)}
						</ul>
						<Link href={"/posts"}>
							<p className="cursor-pointer hover:underline text-right font-medium">
								...View All Posts
							</p>
						</Link>
					</section>
					<section className="max-w-3xl mx-auto p-8 pt-4 rounded-md shadow-md hover:shadow-lg transition-all duration-75 bg-white">
						<Link href={"/notes"}>
							<h2 className="cursor-pointer hover:underline text-3xl font-bold mb-6">
								Recent Notes
							</h2>
						</Link>
						<ul>
							{notes.length > 0 ? (
								notes.map((note) => (
									<li key={note.filePath} className="mb-4">
										<NotePreview {...note} />
									</li>
								))
							) : (
								<li>No notes</li>
							)}
						</ul>
						<Link href={"/notes"}>
							<p className="cursor-pointer hover:underline text-right font-medium">
								...View All Notes
							</p>
						</Link>
					</section>
				</div>
			</div>
		</Layout>
	);
}

export function getStaticProps() {
	const MAX_POSTS = 5;
	const posts = getFilesInDirectory(process.env.POSTS_PATH)
		.map((filePath) => {
			const { content, data } = getFileContent(filePath);

			return {
				content,
				data,
				filePath,
			};
		})
		.slice(0, MAX_POSTS);

	const notes = recursivelyGetFilesInDirectory(process.env.NOTES_PATH)
		.map((filePath) => {
			const { content, data } = getFileContent(filePath);

			return {
				content,
				data,
				filePath,
			};
		})
		.sort((noteA, noteB) =>
			new Date(noteA.data.date).getTime() -
				new Date(noteB.data.date).getTime() >
			0
				? -1
				: 1
		)
		.slice(0, MAX_POSTS);

	return { props: { posts, notes } };
}
