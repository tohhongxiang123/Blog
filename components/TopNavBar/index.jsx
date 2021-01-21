import React from 'react'
import ToggleSwitch from '../ToggleSwitch'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Link from 'next/link'

export default function NavBar({ children=[] }) {
	const [isDark, setIsDark] = useState(false)
	const handleToggle = () => setIsDark(c => !c)

	useEffect(() => {
		const cachedThemePreference = localStorage.getItem('isDark')
		if (cachedThemePreference == 'dark') {
			setIsDark(true)
		}
	}, [])

	useEffect(() => {
		const root = document.querySelector('html')
		if (isDark) {
			root.className = 'dark'
		} else {
			root.className = 'light'
		}

		localStorage.setItem('isDark', isDark ? 'dark' : 'light')
	}, [isDark])

    return (
        <nav className={styles.root}>
            <ul className={styles.navBarList}>
                <li><strong><Link href={'/'}>Home</Link></strong></li>
                {children.map((child, index) => <li key={index}>{child}</li>)}
                <ToggleSwitch onChange={handleToggle} checked={isDark} />
            </ul>
        </nav>
    )
}
