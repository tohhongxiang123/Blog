import hydrate from 'next-mdx-remote/hydrate'
import dynamic from 'next/dynamic'
import styles from './index.module.scss'

const components = {
	TestComponent: dynamic(() => import('../TestComponent')),
}

export default function PostPage({ source, frontMatter, ...props }) {
	const content = hydrate(source, { components })
	return (
		<div {...props} className={`${props.className} max-w-6xl mx-auto`}>
			<header>
				{frontMatter.description && (
					<p>{frontMatter.description}</p>
				)}
				{frontMatter.date && (
					<p>{frontMatter.date}</p>
				)}
			</header>
			{(frontMatter.date || frontMatter.description) && <hr className={"opacity-30"} />}
			<main className={styles.markdownBody}>{content}</main>
		</div>
	)
}