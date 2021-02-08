import React from 'react'
import Link from 'next/link'
import { formatDate } from '../utils/convertDate'

export default function NotePreview({ filePath, data, ...props }) {
    return (
        <div {...props}>
            <Link
                href={`/${filePath}`}
            >
                <div className="flex flex-col sm:flex-row sm:justify-between items-baseline">
                    <a className="cursor-pointer"><strong>{data.title}</strong></a>
                    {data.date && <small className="flex-shrink-0">{formatDate(data.date)}</small>}
                </div>
            </Link>
            <p><small>{filePath.replace(/\\/g, ' > ')}</small></p>
        </div>
    )
}
