import React from 'react'
import { useState } from 'react'
import Link from 'next/link'

export default function NavBar({ children=[], ...props }) {
	const [isOpen, setIsOpen] = useState(false)
	const toggleMenu = () => {
		setIsOpen(c => !c)
	}

    return (
        <nav {...props} className={`sticky top-0 px-8 py-4 shadow-sm z-20 ${props.className}`}>
            <ul className="grid grid-cols-1 grid-flow-col gap-4">
                <li><strong><Link href={'/'}>Home</Link></strong></li>
				<li className="block sm:hidden">
					<button className="flex z-20 focus:outline-none opacity-75 hover:opacity-100" onClick={toggleMenu}>
						<img src={`/icons/${isOpen ? 'hamburger_open' : 'hamburger'}.svg`} width={32} height={32} className="m-0" />
					</button>
				</li>
                {children.map((child, index) => <li className="hidden sm:block" key={index}>{child}</li>)}
            </ul>
			<ul className={`${isOpen ? 'opacity-100 static' : 'opacity-0 absolute'} transition-all duration-100 ease-in-out sm:hidden pt-4 m-0 z-10`}>
				{children.map((child, index) => <li key={index}>{child}</li>)}
			</ul>
        </nav>
    )
}
