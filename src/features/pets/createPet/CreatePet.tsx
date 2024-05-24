import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { addPet } from "../petsSlice";
import { ageList, categoryList, countryList, petTypeList, sexList } from "../petsList/data";
import { selectUser } from "../../auth/authSlice";
import { useState } from "react";
import s from "./createPet.module.css"

export default function CreatePet(){

    const userSelected = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

    const handlePetPhotoChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
    ) => {
      const file = event.currentTarget.files?.[0];
      if (file) {
        // if (file.size > 5 * 1024 * 1024) { // Проверка на 5MB
        //   setAvatarError("File size should be less than 5MB");
        //   return;
        // }
        // setAvatarError(null); // Сброс ошибки, если файл подходит
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result?.toString().split(',')[1]; // Удаление префикса "data:image/png;base64,"
          if (base64String) {
            setFieldValue('avatar', base64String);
            setPhotoPreview(reader.result?.toString() || null); // Установка превью
          }
        };
        reader.readAsDataURL(file);
      }
    };

    return(

        <div>
      <h1>Any place in your app!</h1>
      <Formik
        initialValues={{ 
            caption: "",
            petType: "",
            category: "",
            gender: "",
            age: "",
            photos: [""],
            country: "",
            city: "",
            description: "" 
        }}

        
        
        onSubmit={async(values, { setSubmitting, resetForm }) => {
            try{
            await dispatch(addPet(values))
            resetForm() // очищаем форму
            navigate(`/personalCabinet/${userSelected?.login}`)
            }
            catch(error){
              console.error("Ошибка при регистрации объявления: ", error)
            } finally{
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

            {/* <div>
              <label htmlFor="photo">Photo</label>
              <Field type="text" name="photo" />
              <ErrorMessage name="photo" component="div" />
            </div> */}

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

            <div className={s.photo_upload}>
                <div className={s.photo_preview}>
                  {photoPreview ? (
                    <img src={photoPreview} alt="Avatar Preview" />
                  ) : (
                    <div className={s.photo_placeholder}>
                      <span>+</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  name="photos"
                  accept="image/*"
                  onChange={(event) => handlePetPhotoChange(event, setFieldValue)}
                />
                <ErrorMessage name="photos" component="div" className="error" />
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
    