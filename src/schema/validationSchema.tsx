import * as Yup from 'yup'

export const registerValidationSchema = Yup.object({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
})
