import { firestore } from '../firebase/config'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
  deleteDoc,
} from 'firebase/firestore'
import { toast } from 'react-toastify'
import { userDatabase } from './type'

const postRef = collection(firestore, 'posts')
export const userRef = collection(firestore, 'users')
const likeRef = collection(firestore, 'likes')

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

export const checkIfUserExists = async (email: string) => {
  const q = query(userRef, where('email', '==', email))
  const querySnapshot = await getDocs(q)
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

export const likeButton = (postID: string, userID: string, liked: boolean) => {
  try {
    let docToLike = doc(likeRef, `${userID}_${postID}`)
    if (liked) {
      deleteDoc(docToLike)
    } else {
      setDoc(docToLike, { userID, postID })
    }
  } catch (error: any) {
    toast.error(error.message)
  }
}

export const getLikesByUser = (
  userID: string,
  postID: string,
  setLiked: any,
  setLikesCount: any
) => {
  try {
    let likeQuery = query(likeRef, where('postID', '==', postID))
    onSnapshot(likeQuery, (snapshot) => {
      let likes = snapshot.docs.map((doc) => doc.data())
      let likesCount = likes.length
      const isLiked = likes.some((like) => like.userID === userID)
      setLikesCount(likesCount)
      setLiked(isLiked)
    })
  } catch (error: any) {
    toast.error(error.message)
  }
}
