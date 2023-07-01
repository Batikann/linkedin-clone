import { firestore } from '../firebase/config'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { toast } from 'react-toastify'
import { userDatabase } from './type'

const postRef = collection(firestore, 'posts')
const userRef = collection(firestore, 'users')

export const postStatus = (status: any) => {
  addDoc(postRef, status)
    .then(() => {
      toast.success('Gönderi Başarıyla Eklendi')
    })
    .catch((e) => {
      toast.error(e.message)
    })
}

export const getPosts = (setPosts: any) => {
  onSnapshot(postRef, (res) => {
    setPosts(
      res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
    )
  })
}

export const postUserData = (object: any) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((e) => {
      console.log(e.message)
    })
}

export const getCurrentUser = (
  setCurrentUser: React.Dispatch<React.SetStateAction<userDatabase | undefined>>
) => {
  onSnapshot(userRef, (response) => {
    setCurrentUser(
      response.docs
        .map((doc) => {
          return { ...doc.data(), userID: doc.data().userID, id: doc.id }
        })
        .filter((item: userDatabase) => {
          return item.email == localStorage.getItem('userEmail')
        })[0]
    )
  })
}

export const editProfile = (userID: string, payload: any) => {
  let userToEdit = doc(userRef, userID)
  updateDoc(userToEdit, payload)
    .then(() => {
      toast.success('Profiliniz Başarıyla Güncellendi..')
    })
    .catch((err) => {
      toast.error(err.message)
    })
}

export const emailAlreadyExists = async (email: string) => {
  const db = getFirestore()

  const querySnapshot = await getDocs(
    query(collection(db, 'emails'), where('email', '==', email), limit(1))
  )

  return !querySnapshot.empty
}

export const getSingleStatus = (setAllStatus: any, id: string) => {
  const singlePostQuery = query(postRef, where('userID', '==', id))
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id }
      })
    )
  })
}

export const getSingleUser = (setCurrentUser: any, email: string) => {
  const singleUserQuery = query(userRef, where('email', '==', email))
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id }
      })[0]
    )
  })
}
