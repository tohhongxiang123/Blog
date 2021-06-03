import React from "react"
import Link from 'next/link'
import { formatDate } from '../utils/convertDate'

export default function PostPreview({ filePath, data, ...props }) {
	return (
		<div className="flex flex-col sm:flex-row sm:justify-between items-baseline" {...props}>
			<Link as={`/${filePath}`} href={`/posts/[slug]`}>
				<a className="hover:underline font-medium">{data.title}</a>
			</Link>
			<small className="flex-shrink-0">
				{formatDate(data.date)}
			</small>
		</div>
	);
}
