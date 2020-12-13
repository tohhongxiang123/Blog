import React from 'react'
import Link from 'next/link'

export default function NotePreview({ filePath, data }) {
    return (
        <div>
            <Link
                as={`/${filePath}`}
                href={`/notes/[slug]`}
            >
                <a><strong>{data.title}</strong></a>
            </Link>
            <p><small>{filePath.replace(/\\/g, ' > ')}</small></p>
        </div>
    )
}
