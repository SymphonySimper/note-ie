import { writable } from 'svelte/store'

function createIsLoading() {
	let { subscribe, set } = writable(false)
	return {
		subscribe,
		display: () => {
			set(true)
			setTimeout(() => set(false), 4500)
		}
	}
}
const isLoading = createIsLoading()
export default isLoading
