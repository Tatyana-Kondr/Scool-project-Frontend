import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { editPet, getPet, selectPet } from "../petsSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  ageList, categoryList, countryList, sexList,
} from "../petsList/data";
import styles from "./editPet.module.css";
import { selectUser } from "../../auth/authSlice";
import { PetEditDTO } from "../types";

const EditPet: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { petId } = useParams<{ petId: string }>();
  const currentPet = useAppSelector(selectPet);
  const currentUser = useAppSelector(selectUser);
  const [photos, setPhotos] = useState<{ file: File | null, preview: string | null }[]>([{ file: null, preview: null }, { file: null, preview: null }, { file: null, preview: null }]);

  const [initialValues, setInitialValues] = useState({
    caption: currentPet?.caption || "",
    category: currentPet?.category || "",
    gender: currentPet?.gender || "",
    age: currentPet?.age || "",
    country: currentPet?.country || "",
    city: currentPet?.city || "",
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
        category: currentPet.category,
        gender: currentPet.gender,
        age: currentPet.age,
        country: currentPet.country,
        city: currentPet.city,
        description: currentPet.description,
      });
      setPhotos(currentPet.photoUrls.map(url => ({ file: null, preview: url }))); // Инициализация фото с URL-адресами
    }
  }, [currentPet]);

  const handlePhotoChange = ( event: React.ChangeEvent<HTMLInputElement>, index: number ) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prevPhotos) => {
          const newPhotos = [...prevPhotos];
          newPhotos[index] = {
            file,
            preview: reader.result as string,
          };
          return newPhotos;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (
    values: PetEditDTO,
    { setSubmitting, resetForm }: any
  ) => {
    if (petId && initialValues) {
      try {

        // photos.forEach((photo, index) => {
        //   if (photo.file) {
        //     formData.append(`photos[${index}]`, photo.file);
        //   } else if (photo.preview && typeof photo.preview === "string") {
        //     formData.append(`photoUrls[${index}]`, photo.preview);
        //   }
        // });
        const filePhotos = photos.map(photo => photo.file).filter(photo => photo !== null) as File[];
        await dispatch(
          editPet({ petEditDTO: values, id: Number(petId), files: filePhotos })
        );
        //alert("Pet details updated successfully");
        navigate(`/personalCabinet/${currentUser?.login}`);

        resetForm();
      } catch (error) {
        console.error("Error:", error);
        alert("Error updating pet details");
      }
    }
  };

  return (
    <div className={styles.container_editpet}>
      <div className={styles.box}>
        <h2>Edit Pet</h2>
        <Formik
          //enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className={styles.photos_container}>
              {[0, 1, 2].map((index) => (
                <div key={index} className={styles.photoItem}>
                  <img
                    src={
                      photos[index]?.preview || currentPet?.photoUrls[index] || ""
                    }
                    alt="Pet"
                    className={styles.photo}
                  />
                  <input
                    className={styles.button_edit_photo}
                    type="file"
                    name={`photo_${index}`}
                    accept="image/*"
                    onChange={(event) => handlePhotoChange(event, index)}
                  />
                </div>
              ))}
            </div>

            <div className={styles.group_edit_field}>
              <label htmlFor="caption">Caption</label>
              <Field name="caption" type="text" />
              <ErrorMessage
                name="caption"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.group_edit_field}>
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

            <div className={styles.group_edit_field}>
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

            <div className={styles.group_edit_field}>
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

            <div className={styles.group_edit_field}>
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

            <div className={styles.group_edit_field}>
              <label htmlFor="city">City</label>
              <Field name="city" type="text" />
              <ErrorMessage
                name="city"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.group_edit_field}>
              <label htmlFor="description">Description</label>
              <Field name="description" as="textarea" />
              <ErrorMessage
                name="description"
                component="div"
                className={styles.error}
              />
            </div>
            <button className={styles.submit_button} type="submit">Update</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditPet;
