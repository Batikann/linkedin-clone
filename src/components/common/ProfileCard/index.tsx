import {
  getCurrentUser,
  getPosts,
  getSingleStatus,
  getSingleUser,
} from '../../../api/FirestoreAPI'
import { useState, useMemo } from 'react'
import { User, post } from '../type'
import { BiPencil } from 'react-icons/bi'
import ProfileEdit from '../ProfileEdit'
import PostCard from '../PostCard'
import { useLocation } from 'react-router-dom'

const ProfileCard = () => {
  let location = useLocation()
  const [currentUser, setCurrentUser] = useState<User | undefined>()
  const [currentProfile, setCurrentProfile] = useState<User>({})
  const [posts, setPosts] = useState<post[]>([])
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

  return (
    <div className="max-w-5xl mx-auto min-h-screen">
      <div className=" mt-20 bg-white p-4 flex justify-between items-center relative">
        <div>
          <h3 className="font-semibold text-2xl">
            {Object.values(currentProfile).length === 0
              ? currentUser?.firstName && currentUser.lastName
                ? currentUser.firstName + ' ' + currentUser.lastName
                : currentUser?.fullName
              : currentProfile?.fullName}
          </h3>
          <p className="text-base mt-1">
            {Object.values(currentProfile).length === 0
              ? currentUser?.headline
              : currentProfile.headline}
          </p>
          <p className="text-slate-500 text-sm">
            {Object.values(currentProfile).length === 0
              ? currentUser?.city
              : currentProfile.city}
            <span className="ml-1">
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
        {Object.values(currentProfile).length === 0 ? (
          <BiPencil
            onClick={() => setModalOpen(true)}
            size={35}
            className="cursor-pointer hover:bg-slate-200 p-1 rounded-full transition-all duration-300 absolute right-2 top-2"
          />
        ) : (
          ''
        )}
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
