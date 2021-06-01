import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

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

export default function temp() {
	const router = useRouter();

	const fadeIn = useCallback((ref) => {
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
		<div className="flex flex-col items-center bg-gray-800 min-h-screen text-white">
			<nav className="px-16 py-8 flex items-start justify-between w-full fixed top-0">
				<div>
					<p className="text-2xl font-bold tracking-wide opacity-90">
						Toh Hong Xiang
					</p>
				</div>
				<ul className="flex gap-4">
					{pages.map((page) => (
						<Link key={page.path} href={page.path}>
							<a
								className={`mb-4 hover:underline ${
									router.asPath.startsWith(page.path)
										? "font-semibold"
										: ""
								}`}
							>
								{page.name}
							</a>
						</Link>
					))}
				</ul>
			</nav>
			<section className="h-screen flex flex-col items-center justify-center gap-4">
				<h1
					className="text-5xl lg:text-8xl font-bold text-center break-words"
					ref={fadeIn}
				>
					Simple, Elegant, Beautiful
				</h1>
				<ul className="flex flex-wrap items-center justify-center gap-8 p-8 delay-200" ref={fadeIn}>
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
			</section>
		</div>
	);
}
