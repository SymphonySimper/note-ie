export type Note = {
	title: string
	note: string
	time: number
}

export interface NoteWithId extends Note {
	id: string
}
