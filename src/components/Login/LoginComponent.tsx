const LoginComponent = () => {
  return (
    <div className="flex  justify-center items-center min-h-screen">
      <form className="flex flex-col gap-4" action="">
        <input
          type="text"
          placeholder="email"
          className="bg-slate-400 text-black"
        />
        <input
          type="text"
          placeholder="password"
          className="bg-slate-400 text-black"
        />
        <button className="bg-indigo-600 text-white">Login</button>
      </form>
    </div>
  )
}
export default LoginComponent
