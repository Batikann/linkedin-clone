import { AutoComplete, Modal } from 'antd'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { updateProfileSchema } from '../../../schema/updateProfileSchema'
import { useEffect, useState } from 'react'
import axios from 'axios'
import universities from '../../mocks/universitesTurkey.json'
import { editProfile, getCurrentUser } from '../../../api/FirestoreAPI'
import { userDatabase } from '../../../api/type'

interface University {
  name: string
}

const ProfileEdit = ({ modalOpen, setModalOpen, currentUser }: any) => {
  const [countries, setCountries] = useState([])
  const [city, setCity] = useState([])
  const [university, setUniversity] = useState<{ value: string }[]>([])
  const [test, setTest] = useState<userDatabase>()
  useEffect(() => {
    getCurrentUser(setTest)
  }, [])
  const handleSearchCountry = async (value: any) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${value}`
      )
      const countries = response.data

      setCountries(
        countries.map((country: any) => ({
          value: country.name.common,
          label: country.name.common,
        }))
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearchUniversity = (val: string) => {
    let filteredUniversity: University[] = []
    if (university) {
      filteredUniversity = universities.filter((university) =>
        university.name.toLowerCase().includes(val.toLowerCase())
      )
    }
    setUniversity(
      filteredUniversity.map((university) => ({ value: university.name }))
    )
  }

  const handleSearchCity = async (value: any) => {
    try {
      const response = await axios.get(
        `https://turkiyeapi.cyclic.app/api/v1/provinces?name=${value}`
      )
      const cities = response.data.data

      setCity(
        cities.map((city: any) => ({
          value: city.name,
          label: city.name,
        }))
      )
    } catch (error) {
      console.error(error)
    }
  }

  const initialValues = {
    firstName: test?.firstName,
    lastName: test?.lastName,
    additionalName: test?.additionalName,
    headline: test?.headline,
    education: test?.education,
    country: test?.country,
    city: test?.city,
  }
  return (
    <>
      <Modal
        title="Tanıtımı Düzenle"
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[]}
        width={'800px'}
      >
        <h3 className="mb-4">* Zorunlu alanları gösterir</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={updateProfileSchema}
          onSubmit={(values, { resetForm }) => {
            editProfile(currentUser.id, values)

            setModalOpen(false)
          }}
        >
          {({ initialValues }) => (
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label>Ad*</label>
                <Field
                  type="text"
                  name="firstName"
                  className="border border-gray-400 p-1 rounded-md  focus:border-gray-800 "
                />
                <ErrorMessage
                  name="firstName"
                  component="p"
                  className="text-red-600 text-sm font-medium"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Soyadı*</label>
                <Field
                  type="text"
                  name="lastName"
                  className="border border-gray-400 p-1 rounded-md  focus:border-gray-800 "
                />
                <ErrorMessage
                  name="lastName"
                  component="p"
                  className="text-red-600 text-sm font-medium"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Ek ad</label>
                <Field
                  type="text"
                  name="additionalName"
                  className="border border-gray-400 p-1 rounded-md  focus:border-gray-800 "
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Başlık*</label>
                <Field
                  type="text"
                  name="headline"
                  className="border border-gray-400 p-1 rounded-md  focus:border-gray-800 "
                />
                <ErrorMessage
                  name="headline"
                  component="p"
                  className="text-red-600 text-sm font-medium"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Eğitim*</label>
                <Field
                  name="education"
                  className="border border-gray-400 p-1 rounded-md  focus:border-gray-800"
                >
                  {({ field }: any) => (
                    <AutoComplete
                      onChange={(value) =>
                        field.onChange({
                          target: { value: value, name: field.name },
                        })
                      }
                      value={field.value}
                      options={university}
                      onSelect={(value) => console.log('Selected:', value)}
                      onSearch={handleSearchUniversity}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="education"
                  component="p"
                  className="text-red-600 text-sm font-medium"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Ülke/Bölge*</label>
                <Field name="country">
                  {({ field }: any) => (
                    <AutoComplete
                      onChange={(value) =>
                        field.onChange({
                          target: { value: value, name: field.name },
                        })
                      }
                      value={field.value}
                      options={countries}
                      onSelect={(value) => console.log('Selected:', value)}
                      onSearch={handleSearchCountry}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="country"
                  component="p"
                  className="text-red-600 text-sm font-medium"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Şehir</label>
                <Field name="city">
                  {({ field }: any) => (
                    <AutoComplete
                      onChange={(value) =>
                        field.onChange({
                          target: { value: value, name: field.name },
                        })
                      }
                      value={field.value}
                      options={city}
                      onSelect={(value) => console.log('Selected:', value)}
                      onSearch={handleSearchCity}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="city"
                  component="p"
                  className="text-red-600 text-sm font-medium"
                />
              </div>
              <div className="w-full flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-500 text-white text-base py-2 px-4 rounded-full font-semibold"
                >
                  Kaydet
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}
export default ProfileEdit
