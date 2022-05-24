import React from "react";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useCycle } from "framer-motion";

const sidebarVariants = {
	closed: {
		transition: {
			staggerChildren: 0.1,
			staggerDirection: -1
		}
	},
	open: {
		transition: {
			staggerChildren: 0.1,
			staggerDirection: 1
		}
	}
}

const sidebarItemVariants = {
	closed: { opacity: 0, x: 50 },
	open: { opacity: 1, x: 0 }
}

export default function NavBar({ children = [], ...props }) {
	const [isOpen, toggleIsOpen] = useCycle(false, true)

	return (
		<>
			<nav className="sticky top-0 px-8 py-4 z-20 flex justify-between md:items-baseline p-8 bg-white shadow-sm min-w-full">
				<p className="font-extrabold text-2xl"><Link href={"/"}>THX.</Link></p>
				<ul className="gap-16 hidden md:flex">
					{children.map((child, index) => (
						<li key={index} className="text-lg font-semibold text-gray-500 hover:text-gray-600">{child}</li>)
					)}
					{/* {sideBarItems.map(({ name, to }) => <li key={to}><a className="text-lg font-semibold text-gray-500 hover:text-gray-600" href={to}>{name}</a></li>)} */}
				</ul>
				<div className="mr-8">
					<AnimatePresence>
						{isOpen && <motion.button key={"isOpen"} className="block z-20 md:hidden absolute"
							initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
							onClick={() => toggleIsOpen()}>
							<img src={"hamburger_open.svg"} width={32} height={32} />
						</motion.button>}
						{!isOpen && <motion.button key={"notIsOpen"} className="block z-20 md:hidden absolute"
							initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
							onClick={() => toggleIsOpen()}>
							<img src={"hamburger.svg"} width={32} height={32} />
						</motion.button>}
					</AnimatePresence>
				</div>
			</nav>
			<AnimatePresence>
				{isOpen && (
					<motion.aside initial={{ width: 0, opacity: 0 }} animate={{ width: 300, opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="fixed right-0 top-0 w-64 bg-gray-100 border-l-2 border-gray-200 z-10 shadow-lg">
						<motion.div className="h-screen flex flex-col" initial="closed" animate="open" exit="closed">
							<motion.ul variants={sidebarVariants} className="px-8 gap-16 flex flex-col my-auto">
								{children.map((child, index) => <motion.li variants={sidebarItemVariants} key={index} className="text-lg font-semibold text-gray-500 hover:text-gray-600">{child}</motion.li>)}
							</motion.ul>
						</motion.div>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
		// <nav
		// 	{...props}
		// 	className={`sticky top-0 px-8 py-4 shadow-sm z-20 bg-white ${props.className}`}
		// >
		// 	<ul className="grid grid-cols-1 grid-flow-col gap-4">
		// 		<li>
		// 			<strong>
		// 				<Link href={"/"}>THX.</Link>
		// 			</strong>
		// 		</li>
		// 		<li className="block sm:hidden">
		// 			<button
		// 				className="flex z-20 focus:outline-none opacity-75 hover:opacity-100"
		// 				onClick={toggleMenu}
		// 			>
		// 				{isOpen ? (
		// 					<svg
		// 						className="h-6 w-6"
		// 						xmlns="http://www.w3.org/2000/svg"
		// 						fill="none"
		// 						viewBox="0 0 24 24"
		// 						stroke="currentColor"
		// 						aria-hidden="true"
		// 					>
		// 						<path
		// 							strokeLinecap="round"
		// 							strokeLinejoin="round"
		// 							strokeWidth="2"
		// 							d="M6 18L18 6M6 6l12 12"
		// 						/>
		// 					</svg>
		// 				) : (
		// 					<svg
		// 						className="h-6 w-6"
		// 						xmlns="http://www.w3.org/2000/svg"
		// 						fill="none"
		// 						viewBox="0 0 24 24"
		// 						stroke="currentColor"
		// 						aria-hidden="true"
		// 					>
		// 						<path
		// 							strokeLinecap="round"
		// 							strokeLinejoin="round"
		// 							strokeWidth="2"
		// 							d="M4 6h16M4 12h16M4 18h16"
		// 						/>
		// 					</svg>
		// 				)}
		// 			</button>
		// 		</li>
		// 		{children.map((child, index) => (
		// 			<li className="hidden sm:block" key={index}>
		// 				{child}
		// 			</li>
		// 		))}
		// 	</ul>
		// 	<ul
		// 		className={`${isOpen ? "opacity-100" : "opacity-0"} transform ${isOpen ? "translate-y-0" : "-translate-y-96"}
		// 		absolute bg-white w-full top-0 left-0 my-12 p-8 shadow-md transition-all z-10 duration-100 ease-in-out sm:hidden pt-4 m-0`}
		// 	>
		// 		{children.map((child, index) => (
		// 			<li key={index}>{child}</li>
		// 		))}
		// 	</ul>
		// </nav>
	);
}
