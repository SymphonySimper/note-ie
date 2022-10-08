import { writable } from 'svelte/store'
import type { NoteWithId } from '$lib/types'

function createNotes() {
	const { subscribe, set, update } = writable([] as NoteWithId[])
	return {
		subscribe,
		add: (note: NoteWithId) => update((ns) => [note, ...ns]),
		reset: () => set([])
	}
}

export const notes = createNotes()
