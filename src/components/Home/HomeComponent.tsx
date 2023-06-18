import { useNavigate } from 'react-router-dom'
import { logout } from '../../api/AuthAPI'

const HomeComponent = () => {
  const navigate = useNavigate()
  const logoutHandle = async () => {
    let res = await logout()
    res ? navigate('/') : ''
  }

  return (
    <div className="flex justify-between p-4 min-h-screen bg-register-page">
      <h1>HomeComponent</h1>
      <button onClick={logoutHandle} className="text-xl font-medium text-black">
        Logout
      </button>
    </div>
  )
}
export default HomeComponent
