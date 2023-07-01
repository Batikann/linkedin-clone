import { useEffect, useState } from 'react'
import HomeComponent from '../components/Home/HomeComponent'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/common/Loader/Loader'
import { useAppDispatch } from '../hooks/reduxHooks'
import { addUser } from '../redux/AuthSlice'

const Home = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (res: any) => {
      if (!res?.accessToken) {
        navigate('/')
      } else {
        setLoading(true)
        dispatch(addUser({ name: res.displayName }))
      }
    })
  }, [])
  return loading ? <HomeComponent /> : <Loader />
}
export default Home
