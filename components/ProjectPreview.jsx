import React from "react";

export default function ProjectPreview({
	title,
	description,
	code,
	demo,
	screenshot,
    technologies = []
}) {
	return (
		<div class="w-full max-w-md shadow-md hover:shadow-lg mb-8 rounded bg-white">
			<div
				class="h-52 flex-none bg-cover object-center rounded-t text-center overflow-hidden"
				style={{ backgroundImage: `url('${screenshot}')`, backgroundPosition: 'center center' }}
			></div>
			<div class="p-4 flex flex-col justify-between leading-normal">
				<div>
					<div class="text-gray-900 font-bold text-xl mb-2">
						{title}
					</div>
					<p class="text-gray-700 text-base font-medium">{description}</p>
                </div>
                {technologies && <ul className="flex flex-row justify-start items-center pt-4 pb-6 gap-8">
                    {technologies.map(tech => <li key={tech}><img src={`/icons/${tech}.svg`} width={48} height={48} alt={tech} /></li>)}
                </ul>}
                <div className="flex justify-center gap-8">
                    <a
                        href={code}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span class="inline-block bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2 font-semibold text-gray-700 mr-2 mb-2 cursor-pointer">
                            Code
                        </span>
                    </a>
                    <a
                        href={demo}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span class="inline-block bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2 font-semibold text-gray-700 mr-2 mb-2 cursor-pointer">
                            Demo
                        </span>
                    </a>
                </div>
			</div>
		</div>
	);
}
