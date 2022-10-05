import { writable } from 'svelte/store'

type Note = {
	title: string
	note: string
	uid: string
}

export const notes = writable([] as Note[])
