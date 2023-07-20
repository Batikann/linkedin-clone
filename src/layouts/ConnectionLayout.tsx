import ConnectionComponent from '../components/ConnectionComponent'
import Navbar from '../components/common/Navbar/Navbar'

const ConnectionLayout = () => {
  return (
    <div className="bg-register-page min-h-screen flex flex-col items-center">
      <Navbar />
      <ConnectionComponent />
    </div>
  )
}
export default ConnectionLayout
