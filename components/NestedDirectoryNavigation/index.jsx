import React, { useState } from 'react'
import Link from 'next/link'
import styles from './index.module.scss'
import { useRouter } from 'next/router'

export default function NestedDirectoryNavigation({ children, name, path, slug }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(checkIfOpen({ path, children }, router.asPath))
    const isActive = arrayEquals(path.split('\\').filter(Boolean), router.asPath.split('/').filter(Boolean))

    const rootClassNames = "flex justify-between items-center font-medium rounded-r-lg overflow-hidden p-4 cursor-pointer mb-0"
    if (children.length == 0) return (
        <Link href={`/${path}`}><p className={`${rootClassNames} ${isActive ? 'opacity-100 bg-gray-400 bg-opacity-20' : 'opacity-80'} hover:opacity-100`}>{name}</p></Link>
    )

    return (
        <div>
            <div className={`${rootClassNames} opacity-90 hover:opacity-100`}>
                <p className={"m-0"}><strong>{name}</strong></p>
                <button onClick={() => setIsOpen(c => !c)} className={styles.button}>{isOpen ? '👇' : '👉'}</button>
            </div>
            {isOpen && <ul className={"m-0"}>
                {children.map(child => (
                    <li key={child.path} className={"m-0 border-l-4 border-solid border-gray-400 border-opacity-20"}><NestedDirectoryNavigation {...child} slug={slug} /></li>
                ))}
            </ul>}
        </div>
    )
}

function checkIfOpen({ path, children }, currentPath) {
    if (children.length == 0) {
        return arrayEquals(path.split('\\').filter(Boolean), currentPath.split('/').filter(Boolean))
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