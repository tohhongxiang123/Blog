import React, { useState } from 'react';
import { PostStructure } from '../utils/mdxUtils';
import Footer from './Footer';
import Layout, { LayoutProps } from './Layout';
import NestedDirectoryNavigation from './NestedDirectoryNavigation';

interface NotesLayoutProps extends LayoutProps {
    children: React.ReactElement | React.ReactElement[];
    notesStructure: PostStructure[];
}

export default function _NotesLayout({
    children,
    notesStructure = [],
    ...props
}: NotesLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <Layout {...props} enableFooter={false}>
            <div className="flex justify-between w-full relative overflow-hidden h-full">
                <div
                    className={`bg-white bg-opacity-90 pl-2 pt-4 flex-none h-full overflow-y-auto w-72 ${
                        isSidebarOpen ? 'ml-0' : '-ml-72'
                    } md:ml-0 transition-all`}
                >
                    {notesStructure.map((note) => (
                        <NestedDirectoryNavigation {...note} key={note.path} />
                    ))}
                </div>
                <div className="p-2 flex-1 w-32 overflow-y-auto">
                    {children}
                    <Footer />
                </div>
                <button
                    onClick={() => setIsSidebarOpen((c) => !c)}
                    className="flex md:hidden fixed bottom-0 right-0 mb-20 mr-20 items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    {isSidebarOpen ? 'Less' : 'More'}
                </button>
            </div>
        </Layout>
    );
}
