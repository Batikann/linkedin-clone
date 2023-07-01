import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { toast } from 'react-toastify'

import { auth, provider } from '../firebase/config'

export const LoginAPI = async (email: string, password: string) => {
  let state = false
  let user
  try {
    let res = await signInWithEmailAndPassword(auth, email, password)
    state = true
    user = res.user
    toast.success('Giriş İşlemi Başarılı....')
  } catch (error: any) {
    toast.error(error.message)
  }
  return { state, user }
}

export const RegisterAPI = async (
  email: string,
  password: string,
  displayName: string
) => {
  let state = false
  let user
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    let user = userCredential.user
    await updateProfile(user, { displayName })
    toast.success('Kayıt İşlemi Başarılı...')
    state = true
  } catch (error: any) {
    toast.error(error.message)
  }
  return { state, user }
}

export const GoogleSignInAPI = async () => {
  let state = false
  let fullName
  let email
  await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)!
      const token = credential.accessToken
      fullName = result.user.displayName
      email = result.user.email
      state = true
      console.log(fullName)
      console.log(email)

      toast.success('Giriş İşlemi Başarılı')
    })
    .catch((error) => {
      toast.error(error.message)
    })
  return { state, email, fullName }
}

export const logout = async () => {
  let state = false
  await signOut(auth)
    .then(() => {
      toast.success('Çıkış işlemi Başarılı...')
      state = true
    })
    .catch((err) => {
      toast.error(err.message)
    })
  return state
}
