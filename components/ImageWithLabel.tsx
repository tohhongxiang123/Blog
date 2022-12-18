import React from 'react';
import Image from 'next/image';

interface ImageWithLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    label: string;
}

export default function ImageWithLabel({
    src,
    label,
    ...props
}: ImageWithLabelProps) {
    return (
        <div
            {...props}
            className={`flex flex-col text-center items-center ${props.className}`}
        >
            <Image
                className="m-4 mb-0"
                src={src}
                width={64}
                height={64}
                alt={label}
            />
            <p className="font-semibold">{label}</p>
        </div>
    );
}
