import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { addPet } from "../petsSlice";
import { ageList, categoryList, countryList, petTypeList, sexList } from "../petsList/data";
import { selectUser } from "../../auth/authSlice";

export default function CreatePet(){

    const userSelected = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
            photo: ["foto1"],
            country: "",
            city: "",
            description: "" 
        }}
        
        onSubmit={async(values, { setSubmitting, resetForm }) => {
            try{
            await dispatch(addPet(values))
            resetForm() // очищаем форму
            navigate("/personalCabinet/${userSelected.login}")
            }
            catch(error){
              console.error("Ошибка при регистрации объявления: ", error)
            } finally{
              setSubmitting(false)
            }
        }}
      >
        {({ isSubmitting }) => (
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
              <label htmlFor="photo">Photo</label>
              <Field type="text" name="photo" />
              <ErrorMessage name="photo" component="div" />
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
    