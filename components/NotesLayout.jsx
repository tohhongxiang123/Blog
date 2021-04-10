import React, { useState } from 'react'
import Layout from './Layout'
import NestedDirectoryNavigation from './NestedDirectoryNavigation'

export default function _NotesLayout({ children, notesStructure = [], ...props }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <Layout {...props}>
            <div className={"flex justify-between w-full relative overflow-hidden h-full"}>
                <div className={`pl-2 pt-4 flex-none h-full overflow-y-auto w-96 ${isSidebarOpen ? 'ml-0' : '-ml-96'} md:ml-0 transition-all`}>
                    {notesStructure.map((note) => <NestedDirectoryNavigation {...note} key={note.path} />)}
                </div>
                <div className={"p-2 flex-1 w-32 overflow-y-auto"}>
                    {children}
                </div>
                <button onClick={() => setIsSidebarOpen(c => !c)} className={"flex md:hidden fixed bottom-0 right-0 mb-20 mr-20 items-center justify-center px-8 py-3 border border-transparent font-medium text-2xl rounded-md text-white bg-indigo-600 hover:bg-indigo-700"}>
                    {isSidebarOpen ? 'Less' : 'More'}
                </button>
            </div>
        </Layout>
    )
}

