import React from "react";
import ImageWithLabel from "../components/ImageWithLabel";
import Layout from "../components/Layout";
import ProjectPreview from "../components/ProjectPreview";
import { getFileContent, getFilesInDirectory } from "../utils/mdxUtils";

export default function About({ projects = [] }) {
	return (
		<Layout title="About" description={"All about Toh Hong Xiang"}>
			<div className="p-4">
				<section className="flex flex-col justify-center items-center sm:px-8 md:px-16 py-16">
					<img
						src="code_thinking.svg"
						width={400}
						height={400}
						className="mb-8"
						alt="logo"
					/>
					<h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 text-center">Toh Hong Xiang</h1>
					<p className="max-w-2xl font-semibold opacity-60 text-md sm:text-lg mb-8 text-justify">Located in Singapore, I am a full-stack web developer who specializes in React. I am committed to high standards of web design, and I am always learning to expand my ever-growing skillset.</p>
					<ul className="flex flex-wrap gap-2 md:gap-8 justify-center items-center">
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
				</section>
				<section className="flex flex-col justify-center items-center max-w-7xl mx-auto sm:p-8 md:p-16" id="projects">
					<h2 className="text-5xl font-bold tracking-wide mb-12">Projects</h2>
					<ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-max gap-8 items-center mx-auto">
						{projects.map(({ data }) => (
							<li className="w-full h-full">
								<ProjectPreview {...data} key={data.title} />
							</li>
						))}
					</ul>
				</section>
				<section className="flex flex-col justify-center items-center sm:px-8 md:px-16 py-16 max-w-4xl mx-auto">
					<h2 className="text-5xl font-bold tracking-wide mb-12">Skills</h2>
					<ul className="flex flex-wrap gap-8 justify-center items-center">
						<li>
							<ImageWithLabel
								src={"icons/html5.svg"}
								label={"HTML"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/css3.svg"}
								label={"CSS"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/javascript.svg"}
								label={"Javascript"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/sass.svg"}
								label={"SCSS"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/babel.svg"}
								label={"Babel"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/typescript.svg"}
								label={"Typescript"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/react.svg"}
								label={"ReactJS"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/gatsby.svg"}
								label={"GatsbyJS"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/next.svg"}
								label={"NextJS"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/node.svg"}
								label={"NodeJS"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/vue.svg"}
								label={"Vue"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/jquery.svg"}
								label={"jQuery"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/bootstrap.svg"}
								label={"Bootstrap"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/tailwind.svg"}
								label={"Tailwind"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/mongodb.svg"}
								label={"MongoDB"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/postgresql.svg"}
								label={"PostgreSQL"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/graphql.svg"}
								label={"GraphQL"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/express.svg"}
								label={"Express"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/github.svg"}
								label={"Github"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/photoshop.svg"}
								label={"Photoshop"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/figma.svg"}
								label={"Figma"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/heroku.svg"}
								label={"Heroku"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/digitalocean.svg"}
								label={"Digital Ocean"}
							/>
						</li>
						<li>
							<ImageWithLabel
								src={"icons/python.svg"}
								label={"Python"}
							/>
						</li>
					</ul>
				</section>
				<section className="flex flex-col justify-center items-center sm:px-8 md:px-16 py-16 max-w-7xl mx-auto" id="projects">
					<h2 className="text-5xl font-bold tracking-wide mb-12">Contact Me!</h2>
					<p className="max-w-2xl font-semibold opacity-60 text-md sm:text-lg mb-8 text-justify">You can find me on LinkedIn, or email me at <a href="mailto:tohhongxiang@gmail.com"
						target="_blank"
						rel="noopener noreferrer"
						className="cursor-pointer underline font-semibold">tohhongxiang@gmail.com</a></p>
					<ul className="flex items-center justify-center gap-4">
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
				</section>
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

