import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { addPet } from "../petsSlice";
import { ageList, categoryList, countryList, petTypeList, sexList } from "../petsList/data";
import { selectUser } from "../../auth/authSlice";
import s from "./createPet.module.css"
import * as Yup from 'yup';
import { useState } from "react";

export default function CreatePet(){

  const userSelected = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const initialValues = { 
    caption: "",
    petType: "",
    category: "",
    gender: "",
    age: "",
    country: "",
    city: "",
    description: "" ,
    photos: [] as File[]
  };

 
  const validationSchema = Yup.object(
    {
      caption: Yup.string().required('Required'),
      petType: Yup.string().required('Required'),
      category: Yup.string().required('Required'),
      gender: Yup.string().required('Required'),
      age: Yup.string().required('Required'),
      country: Yup.string().required('Required'),    
      city: Yup.string().required('Required'),
      description: Yup.string().required('Required'), 
      photos: Yup.mixed().required('Required')   
    }
  );

  const handleSubmit = async (values:any, { setSubmitting, resetForm }:any ) => {

    const { caption, petType, category, gender, age, country, city, description, photos} = values;
    const petDTO = { caption, petType, category, gender, age, country, city, description};
    const files = photos;

    try{
      await dispatch(addPet({petDTO, files}))
        resetForm() 
        navigate(`/personalCabinet/${userSelected?.login}`)
      } catch(error) {
          console.error("Error then registering a pet: ", error)
      } finally {
          setSubmitting(false)
      }
  };

  const handlePetPhotoChange = (event:any, setFieldValue:any) => {

    const files = Array.from(event.currentTarget.files);
    setFieldValue("photos", files);

    // Генерация превью для фото
    const filePreviews = files.map((file:any) => URL.createObjectURL(file));
    setPreviewImages(filePreviews);
  };

    return(

        <div>
      <h2>Add a New Pet</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}        
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div className={s.photo_upload}>
              <label htmlFor="photos">Photos</label>
              <input
                type="file"
                name="photos"
                multiple
                onChange={(event) => handlePetPhotoChange(event, setFieldValue)}
              />
              <ErrorMessage name="photos" component="div"/>
            </div>
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

            <button type="submit" disabled={isSubmitting}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
    