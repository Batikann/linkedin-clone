import React, { useState } from 'react'
import { User } from '../type'
import { GoogleSignInAPI, LoginAPI } from '../../api/AuthAPI'
import { FcGoogle } from 'react-icons/fc'
import { DiApple } from 'react-icons/di'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'

const LoginComponent = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState<User>({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const loginHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await LoginAPI(credentials.email, credentials.password)
    res ? navigate('/home') : ''
  }

  const loginWithGoogle = async () => {
    const res = await GoogleSignInAPI()
    res ? navigate('/home') : ''
  }

  return (
    <div className="w-full p-4 justify-center flex md:min-h-screen font-roboto relative">
      <img src={logo} alt="" className="absolute w-28 md:left-14   top-8" />
      <div className="flex flex-col gap-4 justify-center mt-20 md:mt-0">
        <div className="flex flex-col gap-4 md:shadow-custom md:p-6 md:w-[352px] rounded-lg">
          <div className="header">
            <h1 className="font-semibold text-3xl mb-2">Oturum aç</h1>
            <p className="text-sm">
              Profesyonel dünyanızla ilgili güncel haberlere sahip olun
            </p>
          </div>
          <form
            onSubmit={loginHandle}
            className="flex flex-col gap-3 items-start"
          >
            <input
              type="text"
              placeholder="E-posta veya Telefon"
              className="h-[52px] w-full border border-gray-600 rounded-md px-4 focus:outline-outline-color mb-3"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
            <div className="w-full relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Şifre"
                className="h-[52px] w-full border border-gray-600 rounded-md px-4 focus:outline-outline-color"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="absolute top-1/2 right-1 -translate-y-1/2 text-sm text-light-blue font-medium hover:bg-blue-100 p-1 px-2 rounded-full"
              >
                {showPassword ? 'gizle' : 'göster'}
              </button>
            </div>
            <p className="text-light-blue font-semibold text-base hover:bg-blue-100 p-1 rounded-full hover:underline hover:underline-offset-2 cursor-pointer">
              Şifrenizi mi unuttunuz?
            </p>
            <button className="h-[52px] bg-light-blue hover:bg-dark-blue w-full rounded-full text-white font-semibold">
              Oturum açın
            </button>
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-64 h-px my-2 bg-gray-300 border-0 " />
              <span className="absolute px-3 text-sm text-gray-500 -translate-x-1/2 bg-white left-1/2 ">
                veya
              </span>
            </div>
          </form>
          <div className="flex flex-col gap-4 ">
            <button
              onClick={loginWithGoogle}
              className="flex items-center gap-2 justify-center text-gray-600 font-semibold text-base border h-11 border-gray-600 rounded-full"
            >
              <FcGoogle size={20} /> <span>Continue with Google</span>
            </button>
            <button className="flex text-gray-600 font-semibold text-base items-center gap-2 justify-center border h-11 border-gray-600 rounded-full">
              <DiApple size={20} /> <span>Apple ile oturum açın</span>
            </button>
          </div>
        </div>
        <Link to="/register">
          <p className="text-center mt-3">
            LinkedIn‘de yeni misiniz?
            <span className="text-light-blue font-semibold ml-2 hover:underline underline-offset-2 cursor-pointer hover:bg-blue-100 p-1 rounded-full ">
              Hemen katılın
            </span>
          </p>
        </Link>
      </div>
    </div>
  )
}
export default LoginComponent
