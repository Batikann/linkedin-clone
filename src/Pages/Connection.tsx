import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import ConnectionLayout from '../layouts/ConnectionLayout'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import Loader from '../components/common/Loader/Loader'

export const Connection = () => {
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
  return loading ? <ConnectionLayout /> : <Loader />
}
