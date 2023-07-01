import { useEffect, useState } from 'react'
import ProfileLayout from '../layouts/ProfileLayout'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'
import Loader from '../components/common/Loader/Loader'

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, (res: any) => {
      if (!res?.accessToken) {
        navigate('/')
      } else {
        setLoading(true)
      }
    })
  }, [])
  return loading ? <ProfileLayout /> : <Loader />
}
export default Profile
