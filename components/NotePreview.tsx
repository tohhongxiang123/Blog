import React from 'react';
import Link from 'next/link';
import { formatDate } from '../utils/convertDate';

interface NotePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    filePath: string;
    data: { [key: string]: any };
}

export default function NotePreview({
    filePath,
    data,
    ...props
}: NotePreviewProps) {
    return (
        <div {...props}>
            <div className="flex flex-col sm:flex-row sm:justify-between items-baseline">
                <Link
                    href={`/${filePath}`}
                    className="cursor-pointer hover:underline text-xl font-normal"
                >
                    {data.title}
                </Link>
                {data.date && (
                    <small className="flex-shrink-0">
                        {formatDate(data.date)}
                    </small>
                )}
            </div>
            <p className="opacity-90">
                <small>{filePath.replace(/\\/g, ' > ')}</small>
            </p>
        </div>
    );
}
