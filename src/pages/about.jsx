import React from "react";
import ImageWithLabel from "../components/ImageWithLabel";
import Layout from "../components/Layout";

export default function About() {
	return (
		<Layout>
			<div className="p-4">
				<section className="flex flex-col justify-center items-center p-16 pb-32 border-gray-300 border-b border-solid">
					<h1 className="text-center text-5xl lg:text-7xl font-bold mb-12">
						Toh Hong Xiang
					</h1>
					<ul className="list-inside p-0 m-0 flex gap-4">
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
				<section className="flex flex-col justify-center items-center p-16 max-w-3xl mx-auto">
					<h2 className="text-5xl font-semibold mb-12">Skills</h2>
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
			</div>
		</Layout>
	);
}
