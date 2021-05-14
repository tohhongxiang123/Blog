import React from "react";
import { getFileContent, getFilesInDirectory } from "../../utils/mdxUtils";
import Layout from "../../components/Layout";
import PostPreview from "../../components/PostPreview";

export default function PostList({ posts = [] }) {
	return (
		<Layout title="Posts">
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
