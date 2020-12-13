import React from 'react'
import Link from 'next/link'

export default function NotePreview({ filePath, data }) {
    return (
        <div>
            <Link
                href={`/${filePath}`}
            >
                <a><strong>{data.title}</strong></a>
            </Link>
            <p><small>{filePath.replace(/\\/g, ' > ')}</small></p>
        </div>
    )
}
