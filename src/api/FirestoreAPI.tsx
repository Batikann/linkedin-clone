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
import { User } from '../components/common/type'

const postRef = collection(firestore, 'posts')
export const userRef = collection(firestore, 'users')
const likeRef = collection(firestore, 'likes')
const commentsRef = collection(firestore, 'comments')
const connectionRef = collection(firestore, 'connection')

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

export const getAllUsers = (
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>
) => {
  onSnapshot(userRef, (res) => {
    setAllUsers(
      res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id, userID: doc.data().userID }
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

export const editPostText = (postID: string, text: string) => {
  let updatePost = doc(postRef, postID)
  try {
    updateDoc(updatePost, { text })
    toast.success('Postunuz başarıyla güncellendi')
  } catch (error) {
    console.log(error)
  }
}

export const deletePostDatabase = (id: string) => {
  let docDelete = doc(postRef, id)
  try {
    deleteDoc(docDelete)
    toast.success('Postunuz Başarıyla Silindi!')
  } catch (error) {
    console.log(error)
  }
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
  if (!querySnapshot.empty) {
    return false
  } else {
    return true
  }
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

export const postComment = (
  postID,
  comment,
  timeStamp,
  headline,
  author,
  email,
  userImageLink = ''
) => {
  try {
    addDoc(commentsRef, {
      postID,
      comment,
      timeStamp,
      headline,
      author,
      email,
      userImageLink,
    })
  } catch (error: any) {
    console.log(error.message)
  }
}

export const getComments = (postID: string, setComments) => {
  let singlePostQuery = query(commentsRef, where('postID', '==', postID))
  onSnapshot(singlePostQuery, (snapshot) => {
    const comments = snapshot.docs.map((doc) => {
      return {
        userID: doc.id,
        ...doc.data(),
      }
    })

    setComments(comments)
  })
  try {
  } catch (error) {
    console.log(error)
  }
}

export const addConnection = (userID: string, targetID: string) => {
  try {
    let connectionToAdd = doc(connectionRef, `${userID}_${targetID}`)
    setDoc(connectionToAdd, { userID, targetID })
    toast.success('Bağlantı Kuruldu!!')
  } catch (error: any) {
    toast.error(error.message)
  }
}

export const getConnections = (
  userID: string,
  targetID: string,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    let connectionQuery = query(
      connectionRef,
      where('targetID', '==', targetID)
    )
    onSnapshot(connectionQuery, (snapshot) => {
      let connections = snapshot.docs.map((doc) => doc.data())
      let isConnected = connections.some(
        (connection) => connection.userID == userID
      )

      setIsConnected(isConnected)
    })
  } catch (error: any) {
    toast.error(error.message)
  }
}

export const getFollowers = (
  userID: string,
  setFollowersCount: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    let connectionQuery = query(connectionRef, where('userID', '==', userID))
    onSnapshot(connectionQuery, (snapshot) => {
      let connections = snapshot.docs.map((doc) => doc.data())
      let followers = connections.length

      setFollowersCount(followers)
    })
  } catch (error) {
    console.log(error)
  }
}

export const getUsersBySearch = (firstName: string, setUsers) => {
  const verifiedVal = firstName.charAt(0).toUpperCase() + firstName.slice(1)
  try {
    let usersQuery = query(
      userRef,
      where('firstName', '>=', verifiedVal),
      where('firstName', '<=', verifiedVal + '\uf8ff')
    )
    onSnapshot(usersQuery, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()))
    })
  } catch (error) {
    console.log(error)
  }
}
