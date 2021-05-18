import hydrate from 'next-mdx-remote/hydrate'
import dynamic from 'next/dynamic'
import { formatDate } from '../../utils/convertDate'

const components = {
	TestComponent: dynamic(() => import('../TestComponent')),
}

export default function PostPage({ source, frontMatter, ...props }) {
	const content = hydrate(source, { components })
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
			<article>{content}</article>
		</div>
	)
}