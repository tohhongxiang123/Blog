import React from 'react'

export default function ImageWithLabel({ src, label, ...props }) {
    return (
        <div {...props} className={`flex flex-col text-center items-center ${props.className}`}>
            <img
                className="m-4 mb-0"
                src={src}
                width={64}
                height={64}
                alt={label}
            />
            <p className="font-semibold">{label}</p>
        </div>
    )
}
