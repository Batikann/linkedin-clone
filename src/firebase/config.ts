import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCZJerfn_VlHd7yQXvOKts4p_KA6IaNXbI',
  authDomain: 'linkedin-clone-c0741.firebaseapp.com',
  projectId: 'linkedin-clone-c0741',
  storageBucket: 'linkedin-clone-c0741.appspot.com',
  messagingSenderId: '957408298323',
  appId: '1:957408298323:web:b2940f427c3781c1b0cda6',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export { app, auth, provider }
