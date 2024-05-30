import { ErrorMessage, Field, Form, Formik } from "formik"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useNavigate } from "react-router-dom"
import { addPet } from "../petsSlice"
import {
  ageList,
  categoryList,
  countryList,
  petTypeList,
  sexList,
} from "../petsList/data"
import { selectUser } from "../../auth/authSlice"
import { useState } from "react"
import * as Yup from "yup"
import s from "./createPet.module.css"


export default function CreatePet() {
  
  const userSelected = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [previewImages, setPreviewImages] = useState<string[]>(["", "", ""])

  const handlePetPhotoChange = 
    (event: React.ChangeEvent<HTMLInputElement>, index: number, setFieldValue: (field: string, value: any) => void) => {
      const files = event.currentTarget.files as FileList;
      if (files && files.length > 0) {
        setFieldValue(`photos[${index}]`, files[0]);
        const filePreview = URL.createObjectURL(files[0]);
        setPreviewImages(prevState => {
          const newState = [...prevState];
          newState[index] = filePreview;
          return newState;
        });
      }
  }

  return (
    <div>
      <h1>Create Pet</h1>
      <Formik
        initialValues={{
          caption: "",
          petType: "",
          category: "",
          gender: "",
          age: "",
          country: "",
          city: "",
          description: "",
          photos: [] as File[],
        }}
        validationSchema={Yup.object({
          caption: Yup.string().required("Caption is required"),
          petType: Yup.string().required("Pet Type is required"),
          category: Yup.string().required("Category is required"),
          gender: Yup.string().required("Gender is required"),
          age: Yup.string().required("Age is required"),
          country: Yup.string().required("Country is required"),
          city: Yup.string().required("City is required"),
          description: Yup.string().required("Description is required"),
          photos: Yup.mixed().required("At least one photo is required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const { caption, petType, category, gender, age, country, city, description, photos } = values;
          const petDTO = {
            caption,
            petType,
            category,
            gender,
            age,
            country,
            city,
            description
          };
          const files = photos;
          try {
            await dispatch(addPet({ petDTO, files }))
              alert("Pet details updated successfully")
              navigate(`/personalCabinet/${userSelected?.login}`);
              resetForm();
          } catch (error) {
              console.error("Error then registering a pet: ", error)
              alert("Error creating pet details- add photo")
          } finally {
              setSubmitting(false)
          }
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="caption">Caption</label>
              <Field type="text" name="caption" />
              <ErrorMessage name="caption" component="div" />
            </div>

            <div>
              <label htmlFor="petType">Pet Type</label>
              <Field as="select" name="petType">
                <option value="" label="Select pet type" />
                {petTypeList.map((type, index) => (
                  <option key={index} value={type.value}>
                    {type.value}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="petType" component="div" />
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <Field as="select" name="category">
                <option value="" label="Select category" />
                {categoryList.map((category, index) => (
                  <option key={index} value={category.value}>
                    {category.value}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" />
            </div>

            <div>
              <label htmlFor="gender">Gender</label>
              <Field as="select" name="gender">
                <option value="" label="Select gender" />
                {sexList.map((gender, index) => (
                  <option key={index} value={gender.value}>
                    {gender.value}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="gender" component="div" />
            </div>

            <div>
              <label htmlFor="age">Age</label>
              <Field as="select" name="age">
                <option value="" label="Select age" />
                {ageList.map((age, index) => (
                  <option key={index} value={age.value}>
                    {age.value}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="age" component="div" />
            </div>

            <div>
              <label htmlFor="country">Country</label>
              <Field as="select" name="country">
                <option value="" label="Select country" />
                {countryList.map((country, index) => (
                  <option key={index} value={country.value}>
                    {country.value}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="country" component="div" />
            </div>

            <div>
              <label htmlFor="city">City</label>
              <Field type="text" name="city" />
              <ErrorMessage name="city" component="div" />
            </div>
            
            <div>
              <label htmlFor="description">Description</label>
              <Field as="textarea" name="description" />
              <ErrorMessage name="description" component="div" />
            </div>

            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={s.photo_upload}>
                <div className={s.photo_preview}>
                  {previewImages[index] && (
                    <img
                      src={previewImages[index]}
                      alt={`Preview ${index}`}
                      style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '10px' }}
                    />
                  )}
                </div>
                <input
                  type="file"
                  name={`photos[${index}]`}
                  onChange={(event) => handlePetPhotoChange(event, index, setFieldValue)}
                />
                <ErrorMessage name={`photos[${index}]`} component="div" className="error" />
              </div>
            ))}
           

            {/* <div className={s.photo_upload}>
            <div className={s.photo_preview}>
              {previewImages.length > 0 && (
                <div>
                  {previewImages.map((src, index) => (
                    <img 
                      key={index} 
                      src={src} 
                      alt={`Preview ${index}`} 
                      style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '10px' }}
                    />
                  ))}
                </div>
              )}
            </div>
              <input
                type="file"
                name="photos"
                multiple
                onChange={(event) => handlePetPhotoChange(event, setFieldValue)}
              />
              <ErrorMessage name="photos" component="div" className="error" />
            </div> */}

            <button type="submit" disabled={isSubmitting}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}