import { addConnection, getConnections } from '../../../api/FirestoreAPI'
import { useEffect, useState } from 'react'
import { HiUserAdd } from 'react-icons/hi'
const ConnectionCard = ({ user, currentUser }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const getCurrentUser = (userID: string) => {
    addConnection(currentUser.userID, userID)
  }

  useEffect(() => {
    getConnections(currentUser?.userID, user.userID, setIsConnected)
  }, [user.userID, currentUser.userID])

  return (
    <>
      {isConnected ? (
        ''
      ) : (
        <div className="border border-gray-400  rounded-lg flex justify-center flex-col items-center gap-3 h-72 relative ">
          <img src={user.bgImageLink} alt="" className="absolute top-0 h-20 " />
          <div className="relative z-10">
            <img
              className="h-[104px] w-[104px] object-cover rounded-full "
              src={user.imageLink}
              alt=""
            />
          </div>
          <div className="text-center p-4">
            <div className="flex flex-col gap-1 mb-8">
              <h2 className="font-semibold text-base">
                {user.firstName + ' ' + user.lastName}
              </h2>
              <h3 className="text-sm text-gray-400">{user.headline}</h3>
            </div>
            <button
              className="text-light-blue flex gap-3 font-semibold border border-light-blue py-1 px-4 outline-none rounded-full items-center hover:bg-blue-100 cursor-pointer"
              onClick={() => getCurrentUser(user.userID)}
            >
              <HiUserAdd size={20} />
              Bağlantı Kur
            </button>
          </div>
        </div>
      )}
    </>
  )
}
export default ConnectionCard
