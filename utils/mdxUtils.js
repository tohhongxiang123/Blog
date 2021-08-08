import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeKatex from 'rehype-katex'
import math from 'remark-math'
import html from 'remark-html'
import prism from 'remark-prism'
import mermaid from 'remark-mermaid'

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

    if (!data.date) {
        // Get last updated time from git logs
        let lastUpdatedDate = execSync(
            `git log -1 --pretty=format:%aI "${path.resolve(postFilePath)}"`
        ).toString()

        // If git logs does not have it, get from file created date
        if (!lastUpdatedDate) {
            const { birthtime } = fs.statSync(path.resolve(postFilePath))
            lastUpdatedDate = birthtime.toISOString()
        }

        data.date = lastUpdatedDate
    }

    return { content, data }
}

export function recursivelyGetFilesInDirectory(directory) {
    const results = [];

    const currentFullPath = path.join(process.cwd(), directory)

    // sort "Chapter 10" after "Chapter 2"
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
    const currentFolderResults = fs.readdirSync(currentFullPath).sort(collator.compare)

    currentFolderResults.forEach(fileOrFolderName => {
        if (fs.statSync(path.join(currentFullPath, fileOrFolderName)).isDirectory()) {
            results.push(...recursivelyGetFilesInDirectory([directory, fileOrFolderName].join('/')))
        } else {
            results.push([directory, fileOrFolderName].join('/'))
        }
    })

    return results
}

function getLastModified(directory) {
    const directoryStats = fs.statSync(directory)
    if (!directoryStats.isDirectory()) {
        return directoryStats.mtime.getTime()
    }

    return Math.max(directoryStats.birthtime.getTime(), ...fs.readdirSync(directory).map(fileOrFolderName => getLastModified(path.join(directory, fileOrFolderName))))
}

export function getFilesWithStructure(directory) {
    // get the current file of the full directory
    const currentFileName = directory.replace(/\\/g, path.sep).split(path.sep)[directory.replace(/\\/g, path.sep).split(path.sep).length - 1]

    // sort "Chapter 10" after "Chapter 2"
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
    const currentFullPath = path.join(process.cwd(), directory)
    const result = { name: currentFileName.replace(/\.(mdx|md)$/, ''), path: directory, children: [], lastModified: getLastModified(directory) }
    if (fs.statSync(path.join(currentFullPath)).isDirectory()) {
        result.children = fs.readdirSync(directory).sort(collator.compare).map(fileOrFolderName => getFilesWithStructure(path.join(directory, fileOrFolderName)))
    }

    return result
}

export async function renderContentWithPlugins({ content, data }) {
    return await serialize(content, {
        mdxOptions: {
            remarkPlugins: [() => mermaid({ simple: true }), math, html, prism],
            rehypePlugins: [rehypeKatex],
        },
        scope: data,
    })
}