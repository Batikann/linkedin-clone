import * as Yup from 'yup'

export const registerValidationSchema = Yup.object({
  email: Yup.string()
    .required('Lütfen e-posta adresinizi girin.')
    .email('Lütfen geçerli bir e-posta adresi giriniz'),
  password: Yup.string()
    .min(8, 'Şifre minimum 8 karakter olmalıdır.')
    .max(16, 'Şifre maksimum 16 karakter olmalıdır.')
    .required('Lütfen şifrenizi girin.'),
  firstName: Yup.string().required('Lütfen isim alanını doldurunuz.'),
  lastName: Yup.string().required('Lütfen soyadı alanını doldurunuz.'),
})
