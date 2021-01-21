import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import rehypeKatex from 'rehype-katex'
import math from 'remark-math'
import html from 'remark-html';
import prism from 'remark-prism';

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const getFilesInDirectory = (directory) => fs
    .readdirSync(path.join(process.cwd(), directory))
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))
    .map(p => [directory, p].join('/'))


export function getFileContent(slug) {
    const postFilePath = decodeURI(slug)
    const source = fs.readFileSync(postFilePath)

    const { content, data } = matter(source)
    if (!data.title) {
        data.title = content.split('\n')[0].replace('#', '')
    }

    return { content, data }
}

export function recursivelyGetFilesInDirectory(directory) {
    const results = [];

    const currentFullPath = path.join(process.cwd(), directory)
    const currentFolderResults = fs.readdirSync(currentFullPath)
    currentFolderResults.forEach(fileOrFolderName => {
        if (fs.lstatSync(path.join(currentFullPath, fileOrFolderName)).isDirectory()) {
            results.push(...recursivelyGetFilesInDirectory([directory, fileOrFolderName].join('/')))
        } else {
            results.push([directory, fileOrFolderName].join('/'))
        }
    })

    return results
}

export function getFilesWithStructure(directory) {
    const currentFileName = directory.replace(/\\/g, '/').split('/')[directory.replace(/\\/g, '/').split('/').length - 1]
    const result = { name: currentFileName.replace(/\.(mdx|md)$/, ''), path: directory, children: [] }

    const currentFullPath = path.join(process.cwd(), directory)
    if (fs.lstatSync(path.join(currentFullPath)).isDirectory()) {
        result.children = fs.readdirSync(directory).map(fileOrFolderName => getFilesWithStructure(path.join(directory, fileOrFolderName)))
    }

    return result
}

export async function renderContentWithPlugins({ content, data, components }) {
    return await renderToString(content, {
        components,
        mdxOptions: {
            remarkPlugins: [math, html, prism],
            rehypePlugins: [rehypeKatex],
        },
        scope: data,
    })
}