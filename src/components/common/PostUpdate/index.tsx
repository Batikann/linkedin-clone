import { FaRegUserCircle } from 'react-icons/fa'
import { AiFillPicture, AiFillYoutube } from 'react-icons/ai'
import { BsCalendarDate, BsNewspaper } from 'react-icons/bs'
import { useState, useMemo } from 'react'
import ModalComponent from '../Modal'
import { postStatus, getPosts } from '../../../api/FirestoreAPI'
import { post } from '../type'
import PostCard from '../PostCard'

const PostStatus = () => {
  const [modal, setModal] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const [posts, setPosts] = useState<post[]>([])
  const addPost = async () => {
    await postStatus(text)
    await setModal(false)
    setText('')
  }
  useMemo(() => {
    getPosts(setPosts)
  }, [])
  console.log(posts)

  return (
    <div className="flex flex-col gap-6">
      <div className="md:w-[555px] h-[116px] w-full bg-white p-3 flex justify-between flex-col rounded-lg border border-gray-300">
        <div className="flex  gap-4 items-center">
          <FaRegUserCircle size={25} />
          <button
            type="button"
            onClick={() => setModal(true)}
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
        />
      </div>
      <div className="flex flex-col gap-6">
        {posts.map((post) => {
          return (
            <span key={post.id}>
              <PostCard id={post.id} status={post.status} />
            </span>
          )
        })}
      </div>
    </div>
  )
}
export default PostStatus
