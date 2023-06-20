import logo from '../../assets/logo.svg'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleSignInAPI, RegisterAPI } from '../../api/AuthAPI'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { registerValidationSchema } from '../../schema/validationSchema'
import { User } from '../type'

const RegisterComponent = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const initialValues: User = {
    email: '',
    password: '',
  }

  const loginWithGoogle = async () => {
    let res = await GoogleSignInAPI()
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
          <Formik
            initialValues={initialValues}
            validationSchema={registerValidationSchema}
            onSubmit={async (values) => {
              let res = await RegisterAPI(values.email, values.password)
              res ? navigate('/') : ''
            }}
          >
            <Form className="flex flex-col gap-6 items-start">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium">E-posta</label>
                <Field
                  type="text"
                  name="email"
                  className="h-[32px] w-full border border-gray-600 rounded-md px-4 focus:outline-gray-700 hover:bg-register-page cursor-pointer "
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="w-full ">
                <label className="text-sm font-medium">
                  Şifre (6+karakter)
                </label>
                <div className="mt-2 relative">
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="h-[32px] w-full border border-gray-600 rounded-md px-4 focus:outline-gray-700 hover:bg-register-page cursor-pointer mb-1"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className="absolute top-1 right-3 text-base font-medium text-light-blue "
                  >
                    {showPassword ? 'Gizle' : 'Göster'}
                  </button>
                  <ErrorMessage
                    className="text-red-600 text-sm"
                    name="password"
                    component="p"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="h-12 w-full rounded-full mb-3 text-white font-semibold bg-light-blue hover:bg-dark-blue"
              >
                Kabul Et ve Katıl
              </button>
              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-2 bg-gray-300 border-0 " />
                <span className="absolute px-3 text-base text-gray-500 -translate-x-1/2 bg-white left-1/2 ">
                  veya
                </span>
              </div>
            </Form>
          </Formik>
          <div className="flex justify-center">
            <button
              onClick={loginWithGoogle}
              className="border-2 font-medium text-sm border-gray-400 gap-2 w-[345px] hover:border-gray-800 flex items-center justify-center h-[44px] rounded-full"
            >
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
