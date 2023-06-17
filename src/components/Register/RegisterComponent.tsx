import logo from '../../assets/logo.svg'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../type'
import { RegisterAPI } from '../../api/AuthAPI'

const RegisterComponent = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [credentials, setCredentials] = useState<User>({
    email: '',
    password: '',
  })

  const registerHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let res = await RegisterAPI(credentials.email, credentials.password)
    res ? navigate('/') : ''
  }

  return (
    <div className="w-full p-6 justify-center md:justify-start flex flex-col items-center md:min-h-screen bg-white font-roboto relative md:bg-register-page">
      <img src={logo} alt="" className="absolute w-28 md:left-14   top-8" />
      <div className="md:mt-32 md:mb-10 mt-24 mb-10">
        <h1 className="text-xl md:text-3xl font-semibold md:font-normal">
          Profesyonel hayatınızdan en iyi şekilde yararlanın
        </h1>
      </div>
      <div className="flex flex-col gap-4 justify-center  md:mt-0">
        <div className=" md:px-8 md:py-6 flex flex-col gap-6 md:bg-white w-[400px] md:shadow-custom rounded-md  ">
          <form
            onSubmit={registerHandle}
            className="flex flex-col gap-2 items-start"
          >
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium">E-posta</label>
              <input
                type="text"
                className="h-[32px] w-full border border-gray-600 rounded-md px-4 focus:outline-gray-700 hover:bg-register-page cursor-pointer mb-3"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </div>
            <div className="w-full ">
              <label className="text-sm font-medium">Şifre (6+karakter)</label>
              <div className="mt-2 relative">
                <input
                  value={credentials.password}
                  type={showPassword ? 'text' : 'password'}
                  className="h-[32px] w-full border border-gray-600 rounded-md px-4 focus:outline-gray-700 hover:bg-register-page cursor-pointer mb-3"
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="absolute top-1 right-3 text-base font-medium text-light-blue "
                >
                  {showPassword ? 'Gizle' : 'Göster'}
                </button>
              </div>
            </div>
            <button className="h-12 w-full rounded-full mb-3 text-white font-semibold bg-light-blue hover:bg-dark-blue">
              Kabul Et ve Katıl
            </button>
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-64 h-px my-2 bg-gray-300 border-0 " />
              <span className="absolute px-3 text-base text-gray-500 -translate-x-1/2 bg-white left-1/2 ">
                veya
              </span>
            </div>
          </form>
          <div className="flex justify-center">
            <button className="border-2 font-medium text-sm border-gray-400 gap-2 w-[345px] hover:border-gray-800 flex items-center justify-center h-[44px] rounded-full">
              <FcGoogle size={20} /> Google ile devam edin
            </button>
          </div>
          <p className="text-center mt-3 text-base">
            Zaten LinkedIn üyesi misiniz?
            <Link
              to="/"
              className="text-light-blue ml-2 font-medium text-sm hover:underline underline-offset-2"
            >
              Oturum açın
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default RegisterComponent
