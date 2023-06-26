import { useNavigate } from 'react-router-dom'
import { logout } from '../../api/AuthAPI'
import PostStatus from '../common/PostUpdate'
const HomeComponent = () => {
  const navigate = useNavigate()
  const logoutHandle = async () => {
    let res = await logout()
    res ? navigate('/') : ''
  }

  return (
    <div className="flex justify-between md:p-4 min-h-screen bg-register-page">
      <div className="max-w-7xl mx-auto">
        <PostStatus />
      </div>
    </div>
  )
}
export default HomeComponent
