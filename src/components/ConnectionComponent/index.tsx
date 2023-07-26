import { getAllUsers, getCurrentUser } from '../../api/FirestoreAPI'
import { useState, useEffect, useMemo } from 'react'
import { User } from '../common/type'
import ConnectionCard from '../common/ConnectionCard'

const ConnectionComponent = () => {
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User>({} as User)
  useEffect(() => {
    getAllUsers(setUsers)
  }, [])
  useMemo(() => {
    getCurrentUser(setCurrentUser)
  }, [])
  return (
    <div className="flex flex-col justify-center mt-10 flex-wrap items-center  bg-white border border-gray-300 rounded-lg  p-4">
      <div className="font-semibold text-lg flex mb-4">
        <h1>Tanıyor Olabilceğiniz Kişiler</h1>
      </div>
      <div className="flex justify-center gap-6 ">
        {users.map((user, i) => {
          return user.email != currentUser?.email ? (
            <span key={i}>
              <ConnectionCard user={user} currentUser={currentUser} />
            </span>
          ) : (
            ''
          )
        })}
      </div>
    </div>
  )
}
export default ConnectionComponent
