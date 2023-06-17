import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { toast } from 'react-toastify'

import { auth, provider } from '../firebase/config'

export const LoginAPI = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      console.log(result.user)
      toast.success('Giriş İşlemi Başarılı')
    })
    .catch((error) => {
      toast.error(error.message)
    })
}

export const RegisterAPI = (email: string, password: string) => {
  try {
    let response = createUserWithEmailAndPassword(auth, email, password)
    return response
  } catch (err: any) {
    return err
  }
}

export const GoogleSignInAPI = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)!
      const token = credential.accessToken
      const user = result.user
      console.log(user)

      toast.success('Giriş İşlemi Başarılı')
    })
    .catch((error) => {
      toast.error(error.message)
    })
}
