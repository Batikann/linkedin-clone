import { useEffect } from 'react'

import { AiFillPicture, AiFillYoutube } from 'react-icons/ai'
import { BsCalendarDate, BsNewspaper } from 'react-icons/bs'
import { useState, useMemo } from 'react'
import ModalComponent from '../Modal'
import {
  postStatus,
  getPosts,
  getCurrentUser,
  editPost,
} from '../../../api/FirestoreAPI'
import { Post, User } from '../type'
import PostCard from '../PostCard'
import { v4 as uuidv4 } from 'uuid'
import { getRelativeTime } from '../../../utils/dateUtils'

const PostStatus = () => {
  const email = localStorage.getItem('userEmail')

  const [modal, setModal] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User>({} as User)
  const [text, setText] = useState<string>('')
  const [posts, setPosts] = useState<Post[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const [postID, setPostID] = useState('')
  const [postImage, setPostImage] = useState<string>('')

  const addPost = async () => {
    let obj = {
      postID: uuidv4(),
      userID: currentUser?.userID,
      text: text,
      timeStamp: getRelativeTime(),
      email: email,
      author: currentUser?.firstName
        ? currentUser?.firstName + ' ' + currentUser?.lastName
        : currentUser?.fullName,
      headline: currentUser?.headline ? currentUser.headline : '',
      postImage: postImage ? postImage : '',
    }

    await postStatus(obj)
    await setModal(false)
    setText('')
  }
  useMemo(() => {
    getPosts(setPosts)
    getCurrentUser(setCurrentUser)
  }, [])

  useEffect(() => {
    setPosts(
      posts.sort((a, b) => {
        const dateA = new Date(a.timeStamp).getTime()
        const dateB = new Date(b.timeStamp).getTime()
        return dateB - dateA
      })
    )
  }, [setPosts, posts])

  const updatePost = () => {
    editPost(postID, text, postImage)
    setModal(false)
  }
  return (
    <div className="flex flex-col  min-h-screen gap-4">
      <div className="md:w-[555px] h-[116px] w-full bg-white p-3 flex justify-between flex-col rounded-lg border border-gray-300 mb-3">
        <div className="flex  gap-4 items-center">
          <img
            src={currentUser?.imageLink!}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <button
            type="button"
            onClick={() => {
              setModal(true)
              setIsEdit(false)
            }}
            className="border border-gray-400 w-full h-12 rounded-full  text-sm font-semibold outline-none text-left px-6 text-gray-500 hover:bg-register-page"
          >
            Gönderi başlat
          </button>
        </div>
        <div className="w-full">
          <ul className="flex justify-between">
            <li className="flex gap-2 text-sm font-semibold text-gray-700 items-center  ">
              <AiFillPicture size={25} className="text-blue-500" />
              <p>Fotoğraf</p>
            </li>
            <li className="flex gap-2 text-sm font-semibold text-gray-700 items-center">
              <AiFillYoutube size={25} className="text-green-600" />
              <p>Video</p>
            </li>
            <li className="flex gap-2 text-sm font-semibold text-gray-700 items-center">
              <BsCalendarDate size={20} className="text-orange-800" />
              <p>Etkinlik</p>
            </li>
            <li className="flex gap-2 text-sm font-semibold text-gray-700 items-center">
              <BsNewspaper size={20} className="text-red-500" />
              <p>Yazı yaz</p>
            </li>
          </ul>
        </div>
        <ModalComponent
          modalOpen={modal}
          setModalOpen={setModal}
          text={text}
          setText={setText}
          addPost={addPost}
          isEdit={isEdit}
          updatePost={updatePost}
          setPostImage={setPostImage}
          postImage={postImage}
        />
      </div>
      <div className="grid grid-cols-1 ">
        {posts.map((post: Post) => {
          return (
            <span key={post.id}>
              <PostCard
                post={post}
                userID={currentUser?.id!}
                user={currentUser}
                setModal={setModal}
                setText={setText}
                setIsEdit={setIsEdit}
                setPostID={setPostID}
                setPostImage={setPostImage}
              />
            </span>
          )
        })}
      </div>
    </div>
  )
}
export default PostStatus
