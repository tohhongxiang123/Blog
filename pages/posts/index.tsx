import React from "react";
import Link from 'next/link'
import { getFileContent, getFilesInDirectory, Post } from "../../utils/mdxUtils";
import Layout from "../../components/Layout";
import PostPreview from "../../components/PostPreview";

export default function PostList({ posts = [] }) {
	return (
		<Layout title="Posts" description="A list of blog posts by Toh Hong Xiang">
			<div className="max-w-5xl mx-auto p-8">
				<h3 className="text-3xl font-bold mb-4">Posts</h3>
				<ul className="list-disc">
					{posts.map((post) => (
						<li key={post.filePath}>
							<PostPreview {...post} />
						</li>
					))}
				</ul>
			</div>
			<div className="max-w-5xl mx-auto p-8 text-right">
				<Link href="/"><a className="font-medium rounded-md py-2 px-4 hover:bg-gray-100">🠔 Back</a></Link>
			</div>
		</Layout>
	);
}

export function getStaticProps() {
	const posts = getFilesInDirectory(process.env.POSTS_PATH).map(
		(filePath) => {
			const { content, data } = getFileContent(filePath);

			return {
				content,
				data,
				filePath,
			};
		}
	);

	return { props: { posts } };
}
