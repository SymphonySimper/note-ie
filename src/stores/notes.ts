import { writable } from 'svelte/store'
import type { Note } from '$lib/types'

export const notes = writable([] as Note[])
