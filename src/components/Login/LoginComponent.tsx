import { useState } from 'react'
import { User } from '../type'
import { GoogleSignInAPI, LoginAPI } from '../../api/AuthAPI'
import { FcGoogle } from 'react-icons/fc'
import { DiApple } from 'react-icons/di'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { loginValidationSchema } from '../../schema/loginValidationSchema'
import classNames from 'classnames'
import { checkIfUserExists, postUserData } from '../../api/FirestoreAPI'
import { v4 as uuidv4 } from 'uuid'
const LoginComponent = () => {
  const navigate = useNavigate()

  const initialValues: User = {
    email: '',
    password: '',
  }
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const loginWithGoogle = async () => {
    const res = await GoogleSignInAPI()
    const state = await checkIfUserExists(res.email!)
    if (state) {
      postUserData({
        userID: uuidv4(),
        fullName: res.firstName,
        email: res.email,
        firstName: res.firstName,
        lastName: '',
      })
    }
    localStorage.setItem('userEmail', res.email!)
    state ? navigate('/home') : ''
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
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={async (values) => {
              const res = await LoginAPI(values.email, values.password)
              localStorage.setItem('userEmail', res.user?.email!)
              res.state ? navigate('/home') : ''
            }}
          >
            {({ errors }) => (
              <Form className="flex flex-col gap-3 items-start">
                <div className="w-full">
                  <Field
                    type="text"
                    placeholder="E-posta veya Telefon"
                    className={classNames({
                      'h-[52px] w-full border  rounded-md px-4  hover:bg-register-page cursor-pointer mb-3':
                        true,
                      'border-red-600 focus:outline-red-600': errors.email,
                      'border-gray-700 focus:outline-gray-700': !errors.email,
                    })}
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-600 text-sm font-medium"
                  />
                </div>
                <div className="w-full relative mt-3">
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Şifre"
                    name="password"
                    className={classNames({
                      'h-[52px] w-full border  rounded-md px-4  hover:bg-register-page cursor-pointer ':
                        true,
                      'border-red-600 focus:outline-red-600': errors.password,
                      'border-gray-700 focus:outline-gray-700':
                        !errors.password,
                    })}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className="absolute top-1/2 right-1 -translate-y-1/2 text-sm text-light-blue font-medium hover:bg-blue-100 p-1 px-2 rounded-full "
                  >
                    {showPassword ? 'gizle' : 'göster'}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-600 text-sm font-medium"
                />
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
              </Form>
            )}
          </Formik>
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
