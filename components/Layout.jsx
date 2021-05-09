import Head from 'next/head'
import Link from 'next/link'
import Footer from './Footer'
import TopNavBar from './TopNavBar'

export default function Layout({ children, title = "Blog", enableFooter=true }) {
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
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<TopNavBar>
				<Link href={"/posts"}><a className="mb-4 hover:underline">Posts</a></Link>
				<Link href={"/notes"}><a className="mb-4 hover:underline">Notes</a></Link>
				<Link href={"/projects"}><a className="mb-4 hover:underline">Projects</a></Link>
				<Link href={"/about"}><a className="mb-4 hover:underline">About</a></Link>
			</TopNavBar>
			<main className="flex-grow overflow-y-auto relative" style={{ background: 'url("background.svg") no-repeat', backgroundSize: 'cover' }}>
				{children}
			</main>
			{enableFooter && <Footer />}
		</div>
	)
}
