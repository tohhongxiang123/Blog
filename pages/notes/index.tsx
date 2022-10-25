import React, { useState } from "react";
import Link from "next/link";
import {
	getFilesWithStructure,
	recursivelyGetFilesInDirectory,
	getFileContent,
	Post,
} from "../../utils/mdxUtils";
import NotesLayout from "../../components/NotesLayout";
import NotePreview from "../../components/NotePreview";
import { InferGetStaticPropsType } from "next";
import TextInput from "../../components/TextInput";

export default function index({ notes = [], notesStructure = [] }: InferGetStaticPropsType<typeof getStaticProps>) {
	const [searchText, setSearchText] = useState("")

	const shownNotes = notes.filter(note => note.data.title.toLowerCase().includes(searchText.toLowerCase()))
	return (
		<NotesLayout title={"Notes"} notesStructure={notesStructure} description="All notes written by Toh Hong Xiang">
			<div className="p-4 max-w-2xl mx-auto flex flex-col">
				<h1 className="font-bold text-3xl mb-2">All notes</h1>
				<TextInput value={searchText} onChange={e => setSearchText(e.target.value)} />
				<ul className="pt-4">
					{shownNotes.map((note) => (
						<li key={note.filePath} className="mb-4">
							<NotePreview {...note} />
						</li>
					))}
					{shownNotes.length === 0 && (
						<p className="opacity-60"><i>Nothing found...</i></p>
					)}
				</ul>
				<Link href="/">
					<a className="font-medium rounded-md py-2 px-4 hover:bg-gray-100 ml-auto">
						Back
					</a>
				</Link>
			</div>
		</NotesLayout>
	);
}

export async function getStaticProps() {
	const notes = recursivelyGetFilesInDirectory(process.env.NOTES_PATH).map(
		(filePath) => {
			const { content, data } = getFileContent(filePath);

			return {
				content,
				data,
				filePath,
			};
		}
	).sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

	const notesStructure = getFilesWithStructure(
		process.env.NOTES_PATH
	).children.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());  // latest comes first
	
	return {
		props: {
			notes,
			notesStructure,
		},
	};
}
