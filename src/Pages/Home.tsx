import { useEffect, useState } from 'react'
import HomeComponent from '../components/Home/HomeComponent'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/common/Loader/Loader'

const Home = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    onAuthStateChanged(auth, (res: any) => {
      if (!res?.accessToken) {
        navigate('/')
      } else {
        setLoading(true)
      }
    })
  }, [])
  return loading ? <HomeComponent /> : <Loader />
}
export default Home
