import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { toast } from 'react-toastify'

import { auth, provider } from '../firebase/config'

export const LoginAPI = async (email: string, password: string) => {
  let state = false
  await signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      console.log(result.user)
      toast.success('Giriş İşlemi Başarılı')
      state = true
    })
    .catch((error) => {
      toast.error(error.message)
    })
  return state
}

export const RegisterAPI = async (email: string, password: string) => {
  let state = false
  await createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      toast.success('Kayıt işlemi başarılı')
      state = true
    })
    .catch((err) => {
      toast.error(err.message)
    })
  return state
}

export const GoogleSignInAPI = async () => {
  let state = false
  await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)!
      const token = credential.accessToken
      const user = result.user
      console.log(user)
      state = true

      toast.success('Giriş İşlemi Başarılı')
    })
    .catch((error) => {
      toast.error(error.message)
    })
  return state
}
