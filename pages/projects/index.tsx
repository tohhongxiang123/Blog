import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import ProjectPreview from "../../components/ProjectPreview";
import { getFileContent, getFilesInDirectory } from "../../utils/mdxUtils";
import dynamic from "next/dynamic";

const ParticlesBg = dynamic(() => import("particles-bg"), { ssr: false });

export default function projects({ projects }) {
	return (
		<Layout title={"Projects"}>
			<div className="p-12">
				<h1 className="text-5xl font-bold text-center mb-8">
					Projects
				</h1>
				<ul className="flex flex-col gap-8 items-center max-w-2xl mx-auto">
					{projects.map(({ data }) => (
						<ProjectPreview {...data} key={data.title} />
					))}
					<Link href="/">
						<a className="font-medium rounded-md py-2 px-4 hover:bg-gray-100 ml-auto">
							🠔 Back
						</a>
					</Link>
				</ul>
			</div>
			<ParticlesBg
				type="cobweb"
				color={"#AFAFAF"}
				num={64}
				bg={{
					position: "fixed",
					zIndex: -1,
					top: 0,
					left: 0,
					minHeight: "100%",
				} as any}
			/>
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
