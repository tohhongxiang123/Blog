import React from "react";
import { useState } from "react";
import Link from "next/link";

export default function NavBar({ children = [], ...props }) {
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => {
		setIsOpen((c) => !c);
	};

	return (
		<nav
			{...props}
			className={`sticky top-0 px-8 py-4 shadow-sm z-20 ${props.className}`}
		>
			<ul className="grid grid-cols-1 grid-flow-col gap-4">
				<li>
					<strong>
						<Link href={"/"}>Home</Link>
					</strong>
				</li>
				<li className="block sm:hidden">
					<button
						className="flex z-20 focus:outline-none opacity-75 hover:opacity-100"
						onClick={toggleMenu}
					>
						{isOpen ? (
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						) : (
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						)}
					</button>
				</li>
				{children.map((child, index) => (
					<li className="hidden sm:block" key={index}>
						{child}
					</li>
				))}
			</ul>
			<ul
				className={`${isOpen ? "opacity-100" : "opacity-0"} transform ${isOpen ? "translate-y-0" : "-translate-y-96"}
				absolute bg-white w-full top-0 left-0 my-12 p-8 shadow-md transition-all z-10 duration-100 ease-in-out sm:hidden pt-4 m-0`}
			>
				{children.map((child, index) => (
					<li key={index}>{child}</li>
				))}
			</ul>
		</nav>
	);
}
