import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  updateUser,
  selectUser,
  user as fetchCurrentUser,
} from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const EditUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectUser);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [initialValues, setInitialValues] = useState({
    id: 0,
    email: "",
    fullName: "",
    website: "",
    phone: "",
    telegram: "",
    avatar: null as File | null,
  });

  useEffect(() => {
    if (!currentUser) {
      dispatch(fetchCurrentUser());
    } else {
      setInitialValues({
        id: currentUser.id ,
        email: currentUser.email || "",
        fullName: currentUser.fullName || "",
        website: currentUser.website || "",
        phone: currentUser.phone || "",
        telegram: currentUser.telegram || "",
        avatar: null,
      });

      if (currentUser.photoUrls) {
        setAvatarPreview(`${"http://localhost:8080"}${currentUser.photoUrls}`);
      }
    }
  }, [dispatch, currentUser]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    fullName: Yup.string().required("Full name is required"),
    avatar: Yup.mixed(),
    website: Yup.string(),
    phone: Yup.string().matches(/^[0-9]+$/, "Phone number is invalid"),
    telegram: Yup.string(),
  });

  const handleAvatarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFieldValue("avatar", file);
      const avatarPreview = URL.createObjectURL(file);
      setAvatarPreview(avatarPreview);
    }
  };

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      if (values.id) {
        await dispatch(
          updateUser({ user: values, file: values.photoUrls, id: values.id })
        );
        navigate(`/personalCabinet/${currentUser?.login}`);
      }
      resetForm();
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit User</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div>
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="User Avatar"
                  style={{ width: "150px", height: "150px", objectFit: "contain"}}
                />
              )}
            </div>
            <input
              type="file"
              name="photoUrls"
              accept="image/*"
              onChange={(event) => handleAvatarChange(event, setFieldValue)}
            />
            <ErrorMessage name="photoUrls" component="div" />

            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />

            <Field type="text" name="fullName" placeholder="Full Name" />
            <ErrorMessage name="fullName" component="div" />

            <Field type="text" name="website" placeholder="Website" />
            <ErrorMessage name="website" component="div" />

            <Field type="text" name="phone" placeholder="Phone" />
            <ErrorMessage name="phone" component="div" />

            <Field type="text" name="telegram" placeholder="Telegram" />
            <ErrorMessage name="telegram" component="div" />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditUser;
