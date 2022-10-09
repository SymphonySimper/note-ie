import { writable } from 'svelte/store'
import type { NoteWithId } from '$lib/types'

function createNotes() {
	const { subscribe, set, update } = writable([] as NoteWithId[])
	return {
		subscribe,
		add: (note: NoteWithId) => update((ns) => [note, ...ns]),
		combine: (ns1: NoteWithId[], ns2: NoteWithId[]) => set([...ns1, ...ns2]),
		reset: () => set([])
	}
}

export const notes = createNotes()
