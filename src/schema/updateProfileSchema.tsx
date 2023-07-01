import * as Yup from 'yup'

export const updateProfileSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  additionalName: Yup.string(),
  headline: Yup.string().required(),
  country: Yup.string().required(),
  city: Yup.string().required(),
})
