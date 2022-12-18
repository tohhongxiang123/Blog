import React, { useState } from "react";
import Link from 'next/link'
import { getFileContent, getFilesInDirectory, Post } from "../../utils/mdxUtils";
import Layout from "../../components/Layout";
import PostPreview from "../../components/PostPreview";
import TextInput from "../../components/TextInput";
import { InferGetStaticPropsType } from "next";

export default function PostList({ posts = [] }: InferGetStaticPropsType<typeof getStaticProps>) {
	const [searchText, setSearchText] = useState("")
	const shownPosts = posts.filter(post => post.data.title.toLowerCase().includes(searchText.toLowerCase()))
	return (
		<Layout title="Posts" description="A list of blog posts by Toh Hong Xiang">
			<div className="max-w-3xl mx-auto p-8">
				<h3 className="text-3xl font-bold mb-4">Posts</h3>
				<TextInput value={searchText} onChange={e => setSearchText(e.target.value)} className="mb-4" />
				<ul className="list-inside">
					{shownPosts.map((post) => (
						<li key={post.filePath}>
							<PostPreview {...post} />
						</li>
					))}
					{shownPosts.length === 0 && (
						<p className="opacity-60"><i>Nothing found...</i></p>
					)}
				</ul>
			</div>
			<div className="max-w-5xl mx-auto p-8 text-right">
				<Link href="/" className="font-medium rounded-md py-2 px-4 hover:bg-gray-100">Back</Link>
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
