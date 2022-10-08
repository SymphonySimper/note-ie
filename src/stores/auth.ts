import { writable } from 'svelte/store'

type User = {
	displayName: string
	uid: string
	photo: string
	email: string
}

export const user = writable({
	displayName: '',
	uid: '',
	photo: '',
	email: ''
} as User)

export const isLoggedIn = writable(false)
