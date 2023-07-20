import {
  getCurrentUser,
  getFollowers,
  getPosts,
  getSingleStatus,
  getSingleUser,
} from '../../../api/FirestoreAPI'
import { useState, useMemo, useEffect } from 'react'
import { User, post } from '../type'
import { BiPencil } from 'react-icons/bi'
import { FiCamera } from 'react-icons/fi'
import ProfileEdit from '../ProfileEdit'
import { useLocation } from 'react-router-dom'
import ImageUploadModalComponents from '../ImageUploadModal'
import BgImageUploadModal from '../bgImageUploadModal'

const ProfileCard = () => {
  let location = useLocation()
  const [currentUser, setCurrentUser] = useState<User | undefined>()
  const [currentProfile, setCurrentProfile] = useState<User>({})
  const [posts, setPosts] = useState<post[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [imageUploadModal, setImageUploadModal] = useState<boolean>(false)
  const [bgImageModal, setBgImageModal] = useState<boolean>(false)
  const [followersCount, setFollowersCount] = useState<number>(0)

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
  useEffect(() => {
    getFollowers(currentUser?.userID!, setFollowersCount)
  }, [currentUser?.userID])

  return (
    <div className="max-w-5xl mx-auto min-h-screen">
      <div className=" mt-8 bg-white flex flex-col relative  rounded-lg">
        <div className="relative">
          <img
            src={
              Object.values(currentProfile).length === 0
                ? currentUser?.bgImageLink!
                : currentProfile.bgImageLink!
            }
            className="w-full h-64 object-cover rounded-t-lg "
            alt=""
          />
          <FiCamera
            size={30}
            className="absolute top-4 right-4 cursor-pointer bg-white p-1 rounded-full text-light-blue hover:text-dark-blue"
            onClick={() => setBgImageModal(true)}
          />
          {currentUser && (
            <img
              className="w-32 h-32 rounded-full absolute object-cover -bottom-12 left-9 cursor-pointer"
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser?.imageLink!
                  : currentProfile.imageLink!
              }
              onClick={() => setImageUploadModal(true)}
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
            <p className="text-slate-500 text-sm mt-1">
              {Object.values(currentProfile).length === 0
                ? currentUser?.city
                : currentProfile.city}
              <span className="ml-2">
                {Object.values(currentProfile).length === 0
                  ? currentUser?.country
                  : currentProfile.country}
              </span>
            </p>
            <p className="font-semibold text-sm mt-1 text-light-blue cursor-pointer hover:underline-offset-2 hover:underline">
              {followersCount} Bağlantı
            </p>
            <div className="flex gap-2 mt-4">
              <button className="bg-light-blue hover:bg-dark-blue text-white font-semibold py-1 px-4 rounded-full">
                Açık
              </button>
              <button className="border border-light-blue text-light-blue py-1 px-4 rounded-full hover:bg-blue-100 font-semibold">
                Profil Bölümü Ekle
              </button>
              <button className="border border-slate-400 py-1 px-4 text-slate-600 rounded-full hover:bg-slate-100">
                Daha Fazla
              </button>
            </div>
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

      <ProfileEdit
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        currentUser={currentUser}
      />
      <ImageUploadModalComponents
        setImageUploadModal={setImageUploadModal}
        imageUploadModal={imageUploadModal}
        currentUser={currentUser}
      />
      <BgImageUploadModal
        setBgImageModal={setBgImageModal}
        bgImageModal={bgImageModal}
        currentUser={currentUser}
      />
    </div>
  )
}
export default ProfileCard
