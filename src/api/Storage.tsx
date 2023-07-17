import { storage } from '../firebase/config'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { editProfile } from './FirestoreAPI'

export const uploadImage = (file: File, id: string) => {
  const profilePics = ref(storage, `profileImages/${file.name}`)
  const uploadTask = uploadBytesResumable(profilePics, file)
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      )
      console.log(progress)
    },
    (error) => {
      console.log(error)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((res) => {
        editProfile(id, { imageLink: res })
      })
    }
  )
}
