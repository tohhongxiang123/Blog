import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { AnimatePresence, motion, useCycle } from 'framer-motion';

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
};

const sidebarItemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 }
};

interface NavbarProps {
    children: React.ReactElement[]
}

export default function NavBar({ children = [] }: NavbarProps) {
    const [isOpen, toggleIsOpen] = useCycle(false, true);

    return (
        <>
            <nav className="sticky top-0 px-8 py-4 z-20 flex justify-between md:items-baseline p-8 bg-white shadow-sm min-w-full">
                <p className="font-extrabold text-2xl">
                    <Link href="/">THX.</Link>
                </p>
                <ul className="gap-16 hidden md:flex">
                    {children.map((child, index) => (
                        <li
                            key={index}
                            className="text-lg font-semibold text-gray-500 hover:text-gray-600"
                        >
                            {child}
                        </li>
                    ))}
                </ul>
                <div className="mr-8">
                    <AnimatePresence>
                        {isOpen && (
                            <motion.button
                                key="isOpen"
                                className="block z-20 md:hidden absolute"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                onClick={() => toggleIsOpen()}
                            >
                                <Image
                                    alt="hamburger menu close"
                                    src="/hamburger_open.svg"
                                    width={32}
                                    height={32}
                                />
                            </motion.button>
                        )}
                        {!isOpen && (
                            <motion.button
                                key="notIsOpen"
                                className="block z-20 md:hidden absolute"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                onClick={() => toggleIsOpen()}
                            >
                                <Image
                                    alt="hamburger menu open"
                                    src="/hamburger.svg"
                                    width={32}
                                    height={32}
                                />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </nav>
            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 300, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="fixed right-0 top-0 w-64 bg-gray-100 border-l-2 border-gray-200 z-10 shadow-lg"
                    >
                        <motion.div
                            className="h-screen flex flex-col"
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <motion.ul
                                variants={sidebarVariants}
                                className="px-8 gap-16 flex flex-col my-auto"
                            >
                                {children.map((child, index) => (
                                    <motion.li
                                        variants={sidebarItemVariants}
                                        key={index}
                                        className="text-lg font-semibold text-gray-500 hover:text-gray-600"
                                    >
                                        {child}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
