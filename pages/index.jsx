import Link from "next/link";
import Layout from "../components/Layout";
import NotePreview from "../components/NotePreview";
import PostPreview from "../components/PostPreview";
import ImageWithLabel from "../components/ImageWithLabel";
import {
	getFileContent,
	getFilesInDirectory,
	recursivelyGetFilesInDirectory,
} from "../utils/mdxUtils";
import dynamic from "next/dynamic";

const ParticlesBg = dynamic(() => import("particles-bg"), { ssr: false });

export default function Index({ posts = [], notes = [] }) {
	return (
		<Layout title={"Home"}>
			<div className="p-8 py-16 text-center flex flex-col items-center">
				<img
					src="code_thinking.svg"
					width={400}
					height={400}
					className="mb-8"
					alt="logo"
				/>
				<h1 className="text-7xl font-bold mb-4">Toh Hong Xiang</h1>
				<p className="opacity-80 font-semibold tracking-wide">
					Web Developer, studying in NTU
				</p>
				<ul className="flex flex-wrap justify-center p-0">
					<li>
						<a
							href="https://github.com/tohhongxiang123"
							target="_blank"
							rel="noopener noreferrer"
							className="cursor-pointer"
						>
							<ImageWithLabel
								src={"icons/github.svg"}
								label={"Github"}
								className="opacity-80 hover:opacity-100 transform hover:-translate-y-0.5 transition-all duration-75"
							/>
						</a>
					</li>
					<li>
						<a
							href="resume.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="cursor-pointer"
							download
						>
							<ImageWithLabel
								src={"icons/resume.svg"}
								label={"Resume"}
								className="opacity-80 hover:opacity-100 transform hover:-translate-y-0.5 transition-all duration-75"
							/>
						</a>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/in/toh-hong-xiang-31551118b/"
							target="_blank"
							rel="noopener noreferrer"
							className="cursor-pointer"
						>
							<ImageWithLabel
								src={"icons/linkedin.svg"}
								label={"LinkedIn"}
								className="opacity-80 hover:opacity-100 transform hover:-translate-y-0.5 transition-all duration-75"
							/>
						</a>
					</li>
					<li>
						<a
							href="mailto:tohhongxiang@gmail.com"
							target="_blank"
							rel="noopener noreferrer"
							className="cursor-pointer"
						>
							<ImageWithLabel
								src={"icons/gmail.svg"}
								label={"Email"}
								className="opacity-80 hover:opacity-100 transform hover:-translate-y-0.5 transition-all duration-75"
							/>
						</a>
					</li>
				</ul>
				<ParticlesBg
					type="cobweb"
					num={50}
					color={"#AFAFAF"}
					bg={true}
				/>
			</div>
			<div className="flex flex-col items-center justify-center divide-x divide-gray-300">
				<div className="w-full max-w-2xl p-8 rounded-md">
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
				</div>
				<div className="w-full max-w-2xl p-8 rounded-md">
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
