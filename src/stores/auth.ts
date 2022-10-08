import { writable } from 'svelte/store'
import type { User } from '$lib/types'

function createUser() {
	const { subscribe, set, update } = writable({} as User)

	return {
		subscribe,
		set: (data: User) =>
			update(() => {
				return { ...data }
			}),
		reset: () => set({} as User)
	}
}
export const user = createUser()

export const isLoggedIn = writable(false)
