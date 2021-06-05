import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getFileContent, getFilesInDirectory } from "../utils/mdxUtils";

const pages = [
	{
		name: "Posts",
		path: "/posts",
	},
	{
		name: "Notes",
		path: "/notes",
	},
	{
		name: "Projects",
		path: "/projects",
	},
	{
		name: "About",
		path: "/about",
	},
];

export default function temp({ projects = [] }) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const fadeIn = useCallback((ref) => {
		if (!ref) return;

		const baseClassesForAnimation = ["transition", "duration-500"];
		const initialClassList = ["opacity-0", "transform", "translate-x-16"];
		const finalClassList = ["opacity-100", "transform", "translate-x-0"];

		// on mount, add inital classes and base classes
		ref.classList.add(...baseClassesForAnimation, ...initialClassList);

		// after delay, remove initial classes, and set final classes
		const timeoutHandler = setTimeout(() => {
			ref.classList.remove(...initialClassList);
			ref.classList.add(...finalClassList);
		}, 500);

		return () => clearTimeout(timeoutHandler); // clean up
	}, []);

	return (
		<div className="flex flex-col items-center bg-gray-800 min-h-screen text-white overflow-x-hidden relative">
			<nav className="px-6 sm:px-16 py-4 flex items-center sm:justify-around justify-between gap-x-4 w-full fixed top-0 z-20 bg-gray-800 bg-opacity-90">
				<div>
					<Link href="/">
						<a className="text-2xl font-bold tracking-wide">THX.</a>
					</Link>
				</div>
				<ul className="gap-4 hidden sm:flex">
					{pages.map((page) => (
						<Link key={page.path} href={page.path}>
							<a
								className={`hover:underline tracking-wide ${
									router.asPath.startsWith(page.path)
										? "font-semibold"
										: "font-light"
								}`}
							>
								{page.name}
							</a>
						</Link>
					))}
				</ul>
				<button
					onClick={() => setIsOpen((c) => !c)}
					className="sm:hidden"
				>
					<svg
						className={`h-6 w-6`}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
				<div
					className={`bg-black bg-opacity-90 w-screen h-screen top-0 left-0 z-20 flex items-center justify-center
					transition-all duration-200 transform
					${
						isOpen
							? "fixed translate-x-0 scale-100"
							: "absolute translate-x-full scale-75"
					}
				`}
				>
					<button
						onClick={() => setIsOpen((c) => !c)}
						className={`fixed top-0 left-0 m-8 z-30 ${
							isOpen ? "" : "hidden"
						}`}
					>
						<svg
							className="h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
					<ul
						className={` sm:hidden flex flex-col items-center justify-center`}
					>
						{pages.map((page) => (
							<Link key={page.path} href={page.path}>
								<a
									className={`text-2xl m-8 hover:underline tracking-wide opacity-80 hover:opacity-100 ${
										router.asPath.startsWith(page.path)
											? "font-normal"
											: "font-light"
									}`}
								>
									{page.name}
								</a>
							</Link>
						))}
					</ul>
				</div>
			</nav>
			<section className="min-h-screen -mb-32 flex flex-col items-center justify-center gap-4 px-4 relative">
				<h1
					className="text-5xl md:text-8xl font-bold text-center break-words max-w-4xl leading-relaxed"
					ref={fadeIn}
				>
					Simple, Elegant, Beautiful
				</h1>
				<ul
					className="flex flex-wrap items-center justify-center gap-8 p-8 delay-200"
					ref={fadeIn}
				>
					<li className="flex flex-col items-center justify-center text-center gap-8">
						<a
							className="cursor-pointer opacity-50 hover:opacity-80"
							href="https://github.com/tohhongxiang123"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src="/icons/github-light.svg"
								alt="Github"
								width={64}
								height={64}
							/>
							<span className="font-semibold tracking-wider">
								Github
							</span>
						</a>
					</li>
					<li className="flex flex-col items-center justify-center text-center gap-8">
						<a
							className="cursor-pointer opacity-50 hover:opacity-80"
							href="resume.pdf"
							download
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src="/icons/resume-light.svg"
								alt="Resume"
								width={64}
								height={64}
							/>
							<span className="font-semibold tracking-wider">
								Resume
							</span>
						</a>
					</li>
					<li className="flex flex-col items-center justify-center text-center gap-8">
						<a
							className="cursor-pointer opacity-50 hover:opacity-80"
							href="https://www.linkedin.com/in/toh-hong-xiang-31551118b/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src="/icons/linkedin-light.svg"
								alt="LinkedIn"
								width={64}
								height={64}
							/>
							<span className="font-semibold tracking-wider">
								LinkedIn
							</span>
						</a>
					</li>
				</ul>
				<a href="#about">
					<button className="bg-gray-900 hover:bg-black font-bold py-2 pl-4 pr-2 rounded-md inline-flex items-center hover:shadow-lg">
						<span>Learn More</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 0 24 24"
							width="24"
							fill="currentColor"
						>
							<path d="M0 0h24v24H0V0z" fill="none" />
							<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
						</svg>
					</button>
				</a>
			</section>
			<section
				className="flex flex-col py-32 px-4 gap-4 max-w-3xl"
				id="about"
			>
				<h2 className="text-5xl md:text-8xl font-bold text-center break-words md:mb-8">
					About me
				</h2>
				<p className="md:text-lg leading-loose tracking-wide opacity-80 text-justify px-2">
					I am Toh Hong Xiang, a self-driven and dependable web
					developer with 1 year experience. I am familiar in
					conducting analysis to pinpoint effective solutions for
					various end-users, and quick in adapting unfamiliar
					technologies to deliver impactful products ahead of
					deadlines. I focus on creating an intuitive, problem-free
					user experience.
				</p>
			</section>
			<section className="min-h-screen flex flex-col py-16 px-4 gap-4 max-w-3xl">
				<h2 className="text-5xl md:text-8xl font-bold text-center break-words mb-4 md:mb-8">
					My Projects
				</h2>
				<ul className="flex flex-col gap-8 items-center max-w-4xl mx-auto">
					{projects.map(({ data }) => (
						<li key={data.title}>
							{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
							<div className="relative mb-8 flex lg:flex-row flex-col">
								<img
									src={data.screenshot}
									alt={data.title}
									className="filter brightness-75 w-full h-full"
								/>
								<div
									className="lg:bg-black lg:bg-opacity-70 p-4 top-0 right-0 inline-flex flex-col items-around justify-center
									rounded-md mt-0 lg:mt-16 ml-0 lg:-ml-16 z-10 w-1/3"
								>
									<h3 className="font-bold text-xl sm:text-3xl text-center">
										{data.title}
									</h3>
									<p className="font-light text-normal sm:text-lg tracking-wide opacity-90 text-center leading-3">
										<small>{data.description}</small>
									</p>
									<div className="py-4 flex gap-4">
										<a
											href={data.code}
											target="_blank"
											rel="noopener noreferrer"
											className="bg-gray-700 hover:bg-gray-800 font-bold py-2 px-4 rounded-md inline-flex items-center hover:shadow-lg"
										>
											Code
										</a>
										<a
											href={data.demo}
											target="_blank"
											rel="noopener noreferrer"
											className="font-bold py-2 px-4 rounded-md inline-flex items-center"
										>
											Demo
										</a>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</section>
		</div>
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
