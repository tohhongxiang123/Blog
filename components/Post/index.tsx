import dynamic from 'next/dynamic'
import { formatDate } from '../../utils/convertDate'
import { MDXRemote } from 'next-mdx-remote'
import mermaid from "mermaid";
import { useEffect } from 'react';

interface PostPageProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	source: any,
	frontMatter: { [key:string]: string}
}

const components = {
	TestComponent: dynamic(() => import('../TestComponent')),
}

export default function PostPage({ source, frontMatter, ...props }: PostPageProps) {
	useEffect(() => {
		mermaid.initialize({
			startOnLoad: true,
			theme: 'forest'
		})
		mermaid.init();
	}, [source, frontMatter])	
	return (
		<div {...props} className={`prose mx-auto ${props.className}`}>
			<header>
				{frontMatter.description && (
					<p>{frontMatter.description}</p>
				)}
				
				{frontMatter.date && (
					<p><small>Last Updated: {formatDate(frontMatter.date)}</small></p>
				)}
			</header>
			<article>
				<MDXRemote {...source} components={components} />
			</article>
		</div>
	)
}