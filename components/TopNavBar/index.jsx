import React from 'react'
import ToggleSwitch from '../ToggleSwitch'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Link from 'next/link'

export default function NavBar({ children=[] }) {
	const [isOpen, setIsOpen] = useState(false)
	const toggleMenu = () => {
		setIsOpen(c => !c)
	}

    return (
        <nav className={styles.root}>
            <ul className={styles.navBarList}>
                <li><strong><Link href={'/'}>Home</Link></strong></li>
				<li className="block sm:hidden">
					<button className="flex z-20" onClick={toggleMenu}>
						<img src="/icons/hamburger.svg" width={32} height={32} className="m-0" />
					</button>
				</li>
                {children.map((child, index) => <li className="hidden sm:block" key={index}>{child}</li>)}
            </ul>
			<ul className={`${isOpen ? 'opacity-100 static' : 'opacity-0 absolute'} transition-all duration-100 ease-in-out sm:hidden m-0 p-8 z-10`}>
				{children.map((child, index) => <li key={index}>{child}</li>)}
			</ul>
        </nav>
    )
}
