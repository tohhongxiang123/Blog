import Head from "next/head";
import Link from "next/link";
import Footer from "./Footer";
import TopNavBar from "./TopNavBar";
import { useRouter } from "next/router";

export interface LayoutProps {
	children: React.ReactElement | React.ReactElement[],
	title?: string,
	enableFooter?: boolean
}

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
	{
		name: "Portfolio",
		path: "/portfolio",
	},
];
export default function Layout({
	children,
	title = "Blog",
	enableFooter = true,
}) {
	const router = useRouter();
	return (
		<div className="flex flex-col h-screen overflow-y-hidden">
			<Head>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css"
					integrity="sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG"
					crossOrigin="anonymous"
				/>
				<link
					rel="stylesheet"
					href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css"
					as="script"
				/>
				<title>{title}</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<meta
					name="description"
					content="Toh Hong Xiang's personal Blog and portfolio"
				/>
			</Head>
			<TopNavBar>
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
			</TopNavBar>
			<main className="flex-grow overflow-y-auto relative">
				{children}
			</main>
			{enableFooter && <Footer />}
		</div>
	);
}
