import React from "react";

export default function ProjectPreview({
	title,
	description,
	code,
	demo,
	screenshot,
}) {
	return (
		<div class="w-full max-w-md shadow-md hover:shadow-lg mb-8 rounded bg-white">
			<div
				class="h-48 flex-none bg-cover object-center rounded-t text-center overflow-hidden"
				style={{ backgroundImage: `url('${screenshot}')` }}
			></div>
			<div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
				<div class="mb-8">
					<div class="text-gray-900 font-bold text-xl mb-2">
						{title}
					</div>
					<p class="text-gray-700 text-base font-medium">{description}</p>
                </div>
                <div>
                    <a
                        href={code}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span class="inline-block bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer">
                            Code
                        </span>
                    </a>
                    <a
                        href={demo}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span class="inline-block bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer">
                            Demo
                        </span>
                    </a>
                </div>
			</div>
		</div>
	);
}
