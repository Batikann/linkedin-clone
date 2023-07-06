import logo from '../../assets/logo.svg'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleSignInAPI, RegisterAPI } from '../../api/AuthAPI'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { registerValidationSchema } from '../../schema/validationSchema'
import { User } from '../type'
import classNames from 'classnames'
import { postUserData } from '../../api/FirestoreAPI'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
const RegisterComponent = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [step, setStep] = useState<number>(1)
  const initialValues: User = {
    userID: uuidv4(),
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }

  const loginWithGoogle = async () => {
    let res = await GoogleSignInAPI()
    if (res.state) {
      postUserData({
        userID: uuidv4(),
        lastName: '',
        firstName: res.firstName,
        email: res.email,
        fullName: res.firstName,
      })
      localStorage.setItem('userEmail', res.email!)
      res.state ? navigate('/') : ''
    }
  }

  const alertBox = () => {
    toast.error('Lütfen ilgili alanları doldurunuz!')
    setStep(1)
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
              const fullName = values.firstName + ' ' + values.lastName
              let res = await RegisterAPI(
                values.email,
                values.password,
                fullName
              )

              if (res.state) {
                localStorage.setItem('userEmail', values.email)
                postUserData({
                  userID: values.userID,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                })
                res ? navigate('/') : ''
              }
            }}
          >
            {({ errors, values }) => (
              <Form>
                {step == 1 && (
                  <div className={'flex flex-col gap-4 items-start'}>
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-sm font-medium mb-1">
                        E-posta
                      </label>
                      <Field
                        type="text"
                        name="email"
                        className={classNames({
                          'h-[32px] w-full border  rounded-md px-4  hover:bg-register-page cursor-pointer ':
                            true,
                          'border-red-600 focus:outline-red-600': errors.email,
                          'border-gray-700 focus:outline-gray-700':
                            !errors.email,
                        })}
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
                      <div className=" relative mt-1">
                        <Field
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          className={classNames({
                            'h-[32px] w-full border  rounded-md px-4  hover:bg-register-page cursor-pointer ':
                              true,
                            'border-red-600 focus:outline-red-600':
                              errors.password,
                            'border-gray-700 focus:outline-gray-700':
                              !errors.password,
                          })}
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          type="button"
                          className="absolute top-1 right-3 text-base font-medium text-light-blue "
                        >
                          {showPassword ? 'Gizle' : 'Göster'}
                        </button>
                        <ErrorMessage
                          className="text-red-600 text-sm mt-2"
                          name="password"
                          component="p"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={
                        values.email || values.password
                          ? () => setStep((prev) => prev + 1)
                          : alertBox
                      }
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
                    <div className="flex justify-center">
                      <button
                        onClick={loginWithGoogle}
                        className="border-2 font-medium text-sm border-gray-400 gap-2 w-[345px] hover:border-gray-800 flex items-center justify-center h-[44px] rounded-full"
                      >
                        <FcGoogle size={20} /> Google ile devam edin
                      </button>
                    </div>
                    <p className="text-center mt-3 text-base flex justify-center items-center w-full">
                      Zaten LinkedIn üyesi misiniz?
                      <Link
                        to="/"
                        className="text-light-blue ml-2 font-medium text-base hover:underline underline-offset-2"
                      >
                        Oturum açın
                      </Link>
                    </p>
                  </div>
                )}
                {step == 2 && (
                  <div className={'flex flex-col gap-4 items-start'}>
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-sm font-medium mb-1">Ad</label>
                      <Field
                        type="text"
                        name="firstName"
                        className={classNames({
                          'h-[32px] w-full border  rounded-md px-4  hover:bg-register-page cursor-pointer ':
                            true,
                          'border-red-600 focus:outline-red-600':
                            errors.firstName,
                          'border-gray-700 focus:outline-gray-700':
                            !errors.firstName,
                        })}
                      />
                      <ErrorMessage
                        name="firstName"
                        component="p"
                        className="text-red-600 text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-sm font-medium mb-1">Soyadı</label>
                      <Field
                        type="text"
                        name="lastName"
                        className={classNames({
                          'h-[32px] w-full border  rounded-md px-4  hover:bg-register-page cursor-pointer ':
                            true,
                          'border-red-600 focus:outline-red-600':
                            errors.lastName,
                          'border-gray-700 focus:outline-gray-700':
                            !errors.lastName,
                        })}
                      />
                      <ErrorMessage
                        name="lastName"
                        component="p"
                        className="text-red-600 text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="h-12 w-full rounded-full mb-3 text-white font-semibold bg-light-blue hover:bg-dark-blue"
                    >
                      Devam Et
                    </button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
export default RegisterComponent
