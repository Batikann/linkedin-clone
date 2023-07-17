import {
  getCurrentUser,
  getPosts,
  getSingleStatus,
  getSingleUser,
} from '../../../api/FirestoreAPI'
import { useState, useMemo } from 'react'
import { User, post } from '../type'
import { BiPencil } from 'react-icons/bi'
import { FiCamera } from 'react-icons/fi'
import ProfileEdit from '../ProfileEdit'
import PostCard from '../PostCard'
import { useLocation } from 'react-router-dom'
import { uploadImage } from '../../../api/Storage'
import { File } from '../../../api/type'

const ProfileCard = () => {
  let location = useLocation()
  const [currentUser, setCurrentUser] = useState<User | undefined>()
  const [currentProfile, setCurrentProfile] = useState<User>({})
  const [posts, setPosts] = useState<post[]>([])
  const [currentImage, setCurrentImage] = useState<File>({})
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  useMemo(() => {
    getCurrentUser(setCurrentUser)
    getPosts(setPosts)
    if (location?.state?.id) {
      getSingleStatus(setCurrentUser, location.state.id)
    }
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location.state.email)
    }
  }, [])

  const getImage = (event) => {
    setCurrentImage(event.target.files[0])
  }

  const uploadImageAPI = () => {
    uploadImage(currentImage, currentUser?.id)
  }

  return (
    <div className="max-w-5xl mx-auto min-h-screen">
      {/* <input type={'file'} onChange={getImage} />
      <button onClick={uploadImageAPI}>Ekle</button> */}

      <div className=" mt-8 bg-white flex flex-col relative ">
        <div className="relative">
          <img
            src="https://media.licdn.com/dms/image/C4D1BAQHAEidT5HpcMA/company-background_10000/0/1608756742727?e=1690142400&v=beta&t=hZfsERvILGfeNhXGtgqmW7oPxqegXj6IA6zFaTmw_po"
            alt=""
          />
          <FiCamera
            size={35}
            className="absolute top-4 right-4 cursor-pointer hover:bg-white p-1 rounded-full"
          />
          {currentUser && (
            <img
              className="w-32 h-32 rounded-full absolute object-cover -bottom-12 left-9 cursor-pointer"
              src={currentUser.imageLink}
            />
          )}
        </div>
        <div className="p-8 flex justify-between relative mt-6">
          {Object.values(currentProfile).length === 0 ? (
            <BiPencil
              onClick={() => setModalOpen(true)}
              size={30}
              className="cursor-pointer hover:bg-slate-200 p-1 rounded-full transition-all duration-300 absolute right-3 top-2"
            />
          ) : (
            ''
          )}
          <div className="flex flex-col ">
            <h3 className="font-semibold text-2xl">
              {Object.values(currentProfile).length === 0
                ? currentUser?.firstName && currentUser.lastName
                  ? currentUser.firstName + ' ' + currentUser.lastName
                  : currentUser?.fullName
                : currentProfile?.fullName}
            </h3>
            <p className="text-base ">
              {Object.values(currentProfile).length === 0
                ? currentUser?.headline
                : currentProfile.headline}
            </p>
            <p className="text-slate-500 text-sm mt-3">
              {Object.values(currentProfile).length === 0
                ? currentUser?.city
                : currentProfile.city}
              <span>
                {Object.values(currentProfile).length === 0
                  ? currentUser?.country
                  : currentProfile.country}
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold mt-4 hover:text-blue-500 hover:underline hover:underline-offset-2 cursor-pointer">
              {Object.values(currentProfile).length === 0
                ? currentUser?.education
                : currentProfile.education}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 justify-center items-center mt-5">
        {posts
          .filter((item) => {
            if (Object.values(currentProfile).length == 0) {
              return item.email == currentUser?.email
            } else {
              return item.email == currentProfile?.email
            }
          })
          .map((post) => {
            return (
              <span key={post.id}>
                <PostCard
                  id={post.id}
                  text={post.text}
                  timeStamp={post.timeStamp}
                  email={post.email}
                  author={post.author}
                />
              </span>
            )
          })}
      </div>

      <ProfileEdit
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        currentUser={currentUser}
      />
    </div>
  )
}
export default ProfileCard
