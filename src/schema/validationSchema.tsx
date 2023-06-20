import * as Yup from 'yup'

export const registerValidationSchema = Yup.object({
  email: Yup.string().required('Lütfen e-posta adresinizi girin.').email(),
  password: Yup.string().min(8).max(16).required('Lütfen şifrenizi girin.'),
})
