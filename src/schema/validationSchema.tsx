import * as Yup from 'yup'

export const registerValidationSchema = Yup.object({
  email: Yup.string()
    .required('Lütfen e-posta adresinizi girin.')
    .email('Lütfen geçerli bir e-posta adresi giriniz'),
  password: Yup.string().min(8).max(16).required('Lütfen şifrenizi girin.'),
})
