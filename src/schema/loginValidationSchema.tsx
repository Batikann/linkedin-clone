import * as Yup from 'yup'

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required('Lütfen e-posta adresinizi veya telefon numaranızı girin')
    .email('Lütfen geçerli bir e-posta adresi giriniz'),
  password: Yup.string().required('Lütfen bir şifre girin.'),
})
