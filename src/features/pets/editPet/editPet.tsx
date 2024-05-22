import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { Form, useNavigate, useParams } from "react-router-dom"
import { editPet, getPet, selectPet } from "../petsSlice"
import { selectUser } from "../../auth/authSlice"
import { ErrorMessage, Field, Formik } from "formik"
import {
  ageList,
  categoryList,
  countryList,
  petTypeList,
  sexList,
} from "../petsList/data"
import styles from "./editPet.module.css"

const EditPet: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { petId } = useParams<{ petId: string }>();
  const currentPet = useAppSelector(selectPet);
  const currentUser = useAppSelector(selectUser);
  
  const [initialValues, setInitialValues] = useState({
    caption: currentPet?.caption || "",
    petType: currentPet?.petType || "",
    category: currentPet?.category || "",
    gender: currentPet?.gender || "",
    age: currentPet?.age || "",
    photo: currentPet?.photo || ["foto1"],
    country: currentPet?.country || "",
    city: currentPet?.city || "Berlin",
    description: currentPet?.description || "",
  });

  useEffect(() => {
    if (petId) {
      dispatch(getPet(Number(petId)));
    }
  }, [dispatch, petId]);

  useEffect(() => {
    if (currentPet) {
      setInitialValues({
        caption: currentPet.caption,
        petType: currentPet.petType,
        category: currentPet.category,
        gender: currentPet.gender,
        age: currentPet.age,
        photo: currentPet.photo,
        country: currentPet.country,
        city: currentPet.city,
        description: currentPet.description,
      });
    }
  }, [currentPet]);

  const handleSubmit = async (values: any,
    { setSubmitting, resetForm }: any,) => {
      if (petId) {
      try {
        
        await dispatch(editPet({ petDTO: values, id: Number(petId) }));
        alert('Pet details updated successfully');
        navigate(`/personalCabinet/${currentUser?.login}`);
        
        resetForm()
      } catch (error) {
        console.error('Error:', error);
        alert('Error updating pet details');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Edit Pet</h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form>
          <div>
              <label htmlFor="caption">Caption</label>
              <Field name="caption" type="text" />
              <ErrorMessage
                name="caption"
                component="div"
                className={styles.error}
              />
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
              <Field name="city" type="text" />
              <ErrorMessage
                name="city"
                component="div"
                className={styles.error}
              />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <Field name="description" as="textarea" />
              <ErrorMessage
                name="description"
                component="div"
                className={styles.error}
              />
            </div>
            <button type="submit">Update</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditPet;