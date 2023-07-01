import ProfileComponent from '../components/Profile/ProfileComponent'
import Navbar from '../components/common/Navbar/Navbar'

const ProfileLayout = () => {
  return (
    <div className="bg-register-page min-h-screen">
      <Navbar />
      <ProfileComponent />
    </div>
  )
}
export default ProfileLayout
