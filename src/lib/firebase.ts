import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyByTeUyiJFWnZF0TBHMurpyevd9kODKLw4',
	authDomain: 'note-c2de3.firebaseapp.com',
	projectId: 'note-c2de3',
	storageBucket: 'note-c2de3.appspot.com',
	messagingSenderId: '271207812626',
	appId: '1:271207812626:web:8c260b4148daf01628d2cb'
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore()
