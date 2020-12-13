import React from 'react'
import { getFilesWithStructure, recursivelyGetFilesInDirectory, getFileContent } from '../../utils/mdxUtils'
import NotesLayout from '../../components/NotesLayout'
import NotePreview from '../../components/NotePreview'

export default function index({ notes = [], notesStructure = [] }) {
    return (
        <NotesLayout title={"Notes"} notesStructure={notesStructure}>
            <ul className={"mx-auto p-4"}>
                {notes.map(note => (
                    <li key={note.filePath}>
                        <NotePreview {...note} />
                    </li>
                ))}
            </ul>
        </NotesLayout>
    )
}

export async function getStaticProps() {
    const notes = recursivelyGetFilesInDirectory('notes').map((filePath) => {
        const { content, data } = getFileContent(filePath)

        return {
            content,
            data,
            filePath,
        }
    })
    const notesStructure = getFilesWithStructure('notes').children

    return {
        props: {
            notes,
            notesStructure
        }
    }
}
