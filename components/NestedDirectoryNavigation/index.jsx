import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ArrowRight from '../../public/icons/arrow_right.svg'
import ArrowDown from '../../public/icons/arrow_down.svg'

const sep = /\\|\//g // possible separators
export default function NestedDirectoryNavigation({ children, name, path, slug }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(checkIfOpen({ path, children }, decodeURIComponent(router.asPath)))
    const isActive = arrayEquals(path.split(sep).filter(Boolean), decodeURIComponent(router.asPath).split(sep).filter(Boolean))

    const rootClassNames = "flex justify-between items-center font-medium rounded-r-lg overflow-hidden py-2 px-4 cursor-pointer mb-0"
    if (children.length == 0) return (
        <Link href={`/${path}`}><p className={`${rootClassNames} ${isActive ? 'opacity-100 bg-gray-400 bg-opacity-20' : 'opacity-80'} hover:opacity-100`}>{name}</p></Link>
    )

    return (
        <div>
            <div className={`${rootClassNames} opacity-90 hover:opacity-100 cursor-pointer`} onClick={() => setIsOpen(c => !c)}>
                <p className={"m-0"}><strong>{name}</strong></p>
                <button className={"focus:outline-none border-none fill-current"}>{isOpen ? <ArrowDown /> : <ArrowRight />}</button>
            </div>
            {isOpen && <ul className={"ml-2 pl-4"}>
                {children.map(child => (
                    <li key={child.path} className={"m-0"}><NestedDirectoryNavigation {...child} slug={slug} /></li>
                ))}
            </ul>}
        </div>
    )
}

function checkIfOpen({ path, children }, currentPath) {
    if (children.length == 0) {
        return arrayEquals(path.split(sep).filter(Boolean), currentPath.split('/').filter(Boolean))
    }

    return children.some(child => checkIfOpen({ ...child }, currentPath))
}

function arrayEquals(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false
        }
    }

    return true
}