import { storage } from '../firebase/config'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { editProfile } from './FirestoreAPI'

type UploadImageType = {
  file: File
  id: string
  setImageUploadModal: React.Dispatch<React.SetStateAction<boolean>>
  setProgress?: React.Dispatch<React.SetStateAction<number>>
}

export const uploadImage = (
  file: File,
  id: string,
  setImageUploadModal: React.Dispatch<React.SetStateAction<boolean>>,
  setProgress: React.Dispatch<React.SetStateAction<number>>
) => {
  const profilePics = ref(storage, `profileImages/${file.name}`)
  const uploadTask = uploadBytesResumable(profilePics, file)
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress1 = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      )
      setProgress(progress1)
    },
    (error) => {
      console.log(error)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((res) => {
        editProfile(id, { imageLink: res })
        setImageUploadModal(false)
        setProgress(0)
      })
    }
  )
}

export const uploadBgImage = (
  file: File,
  id: string,
  setImageUploadModal: React.Dispatch<React.SetStateAction<boolean>>,
  setProgress: React.Dispatch<React.SetStateAction<number>>
) => {
  const bgPics = ref(storage, `bgImages/${file.name}`)
  const uploadTask = uploadBytesResumable(bgPics, file)
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress1 = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      )
      setProgress(progress1)
    },
    (error) => {
      console.log(error)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((res) => {
        editProfile(id, { bgImageLink: res })
        setImageUploadModal(false)
        setProgress(0)
      })
    }
  )
}

export const uploadPostImage = (
  file: File,
  setPostImage: React.Dispatch<React.SetStateAction<string>>,
  setProgress: React.Dispatch<React.SetStateAction<number>>
) => {
  const postPicsRef = ref(storage, `postImages/${file.name}`)
  const uploadTask = uploadBytesResumable(postPicsRef, file)
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress1 = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      )
      setProgress(progress1)
    },
    (error) => {
      console.log(error)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((res) => {
        setPostImage(res)
        setProgress(0)
      })
    }
  )
}
