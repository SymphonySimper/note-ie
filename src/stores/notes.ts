import { writable } from 'svelte/store'
import type { NoteWithId } from '$lib/types'

export const notes = writable([] as NoteWithId[])
