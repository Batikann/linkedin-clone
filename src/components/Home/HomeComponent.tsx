import PostStatus from '../common/PostUpdate'
const HomeComponent = () => {
  // console.log(getCurrentUser())

  return (
    <div className="flex justify-between md:p-4 min-h-screen bg-register-page">
      <div className="max-w-7xl mx-auto">
        <PostStatus />
      </div>
    </div>
  )
}
export default HomeComponent
