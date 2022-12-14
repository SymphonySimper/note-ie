export type Note = {
	title: string
	note: string
	time: number
	isPinned: boolean
}

export interface NoteWithId extends Note {
	id: string
}

export type User = {
	displayName: string
	uid: string
	photoURL: string
	email: string
}
