import { firestore } from '../firebase/config'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import { toast } from 'react-toastify'

const db = collection(firestore, 'posts')

export const postStatus = (status: string) => {
  let obj = {
    status: status,
  }
  addDoc(db, obj)
    .then(() => {
      toast.success('Gönderi Başarıyla Eklendi')
    })
    .catch((e) => {
      toast.error(e.message)
    })
}

export const getPosts = (setPosts: any) => {
  onSnapshot(db, (res) => {
    setPosts(
      res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
    )
  })
}
