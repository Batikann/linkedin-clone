import { useEffect, useState } from 'react'
import LoginComponent from '../components/Login/LoginComponent'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/common/Loader/Loader'

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, (res: any) => {
      if (res?.accessToken) {
        navigate('/home')
      } else {
        setLoading(true)
      }
    })
  }, [])
  return loading ? <LoginComponent /> : <Loader />
}
export default Login
