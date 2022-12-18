import Head from "next/head";
import Link from "next/link";
import Footer from "./Footer";
import TopNavBar from "./TopNavBar";
import { useRouter } from "next/router";

export interface LayoutProps {
	children: React.ReactElement | React.ReactElement[],
	title?: string,
	description?: string,
	enableFooter?: boolean,
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
		name: "About",
		path: "/about",
	},
	// {
	// 	name: "Portfolio",
	// 	path: "/portfolio",
	// },
	{
		name: "Support",
		path: "/support",
	},
];
export default function Layout({
	children,
	title = "Blog",
	enableFooter = true,
	description = '',
}: LayoutProps) {
	const router = useRouter();
	return (
		<div className="flex flex-col h-screen overflow-y-hidden">
			<Head>
				<title>{title ? `THX - ${title}` : "THX"}</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<meta key="description" property="description" name="description" content={description} />
			</Head>
			<TopNavBar>
				{pages.map((page) => (
					<Link key={page.path} href={page.path}
						className={`mb-4 hover:underline cursor-pointer ${router.asPath.startsWith(page.path)
							? "font-semibold"
							: ""
							}`}
					>
						{page.name}
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
