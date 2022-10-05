import { writable } from 'svelte/store'

type User = {
	displayName: string
	uid: string
}
export const user = writable({
	displayName: '',
	uid: ''
} as User)

export const isLoggedIn = writable(false)
