import React from "react";
import Layout from "../../components/Layout";
import ProjectPreview from "../../components/ProjectPreview";
import { getFileContent, getFilesInDirectory } from "../../utils/mdxUtils";

export default function projects({ projects }) {
	return (
		<Layout title={"Projects"}>
			<div className="p-12">
				<h1 className="text-5xl font-bold text-center mb-8">Projects</h1>
				<ul className="flex flex-col gap-8 items-center">
					{projects.map(({ data }) => <ProjectPreview {...data} key={data.title} />)}
				</ul>
			</div>
		</Layout>
	);
}

export async function getStaticProps() {
	const projects = getFilesInDirectory(process.env.PROJECTS_PATH).map(
		(filePath) => {
			const { content, data } = getFileContent(filePath);

			return {
				content,
				data,
				filePath,
			};
		}
	);

	return {
		props: { projects },
	};
}
