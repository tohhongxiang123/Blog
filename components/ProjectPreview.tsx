import React from "react";

interface ProjectPreviewProps {
    title: string,
    description: string,
    code: string,
    demo: string,
    article: string,
    screenshot: string,
    technologies: string[]
}

export default function ProjectPreview({
    title,
    description,
    code,
    demo,
    screenshot,
    technologies = [],
    article,
}: ProjectPreviewProps) {
    return (
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden shadow-md hover:shadow-lg">
            <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={screenshot} alt={""} />
            <div className="p-6 h-full">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{technologies.map(tech => tech.toUpperCase()).join(', ')}</h2>
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{title}</h1>
                <p className="leading-relaxed mb-3">{description}</p>
                <div className="flex items-center flex-wrap gap-8 justify-center m-4">
                    {code && <a
                        href={code}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="inline-block bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2 font-semibold text-gray-700 mr-2 mb-2 cursor-pointer">
                            Code
                        </span>
                    </a>}
                    {demo && <a
                        href={demo}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="inline-block bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2 font-semibold text-gray-700 mr-2 mb-2 cursor-pointer">
                            Demo
                        </span>
                    </a>}
                    {article && <a
                        href={article}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="inline-block bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2 font-semibold text-gray-700 mr-2 mb-2 cursor-pointer">
                            Article
                        </span>
                    </a>}
                </div>
            </div>
        </div>
    );
}
