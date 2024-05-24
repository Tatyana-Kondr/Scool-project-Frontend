import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppDispatch } from "../../app/hooks";
import { register } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import s from "./register.module.css";

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const initialValues = {
    email: "",
    password: "",
    fullName: "",
    login: "", 
    avatar: "",
    website: "",
    phone: "",
    telegram: "",
    agreeToTerms: false,

  }
  // const validationSchema = Yup.object().shape({
  //   fullname: Yup.string().required("Required"),
  //   username: Yup.string().required("Required"),
  //   password: Yup.string()
  //     .min(8, "Password must be at least 4 characters")
  //     .required("Required"),
  //   email: Yup.string().email("Invalid email format").required("Required"),
  //   phone: Yup.string(),
  //   website: Yup.string().url("Invalid URL"),
  //   telegram: Yup.string(),
  //   agreeToTerms: Yup.bool().oneOf([true], "You must agree to the terms"),
  // })


  
  const handleAvatarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1]; // Удаление префикса "data:image/png;base64,"
        if (base64String) {
          setFieldValue('avatar', base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={s.register}>
      <div className={s.register_container}>
        <h2>Create your account</h2>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await dispatch(register(values));
              resetForm(); // очищаем форму
              navigate("/");
            } catch (error) {
              console.error("Ошибка при регистрации: ", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className={s.register_form}>
              <div className={s.avatar_upload}>
                <div className={s.avatar_preview}>
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar Preview" />
                  ) : (
                    <div className={s.avatar_placeholder}>
                      <span>+</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={(event) => handleAvatarChange(event, setFieldValue)}
                />
                <ErrorMessage name="avatar" component="div" className="error" />
              </div>

              <div className={s.form_group}>
                <label htmlFor="fullName" className={s.required_field}>
                  Full Name
                </label>
                <Field
                  type="text"
                  name="fullName"
                  className={s.form_control}
                  placeholder="FullName"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.form_group}>
                <label htmlFor="login" className={s.required_field}>
                  
                  Username

                </label>
                <Field
                  type="text"
                  name="login"
                  className={s.form_control}
                  placeholder="Login"
                />
                <ErrorMessage
                  name="login"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.form_group}>
                <label htmlFor="password" className={s.required_field}>
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className={s.form_control}
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.form_group}>
                <label htmlFor="email" className={s.required_field}>
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className={s.form_control}
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.form_group}>
                <Field
                  type="text"
                  name="phone"
                  className={s.form_control}
                  placeholder="Phone"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.form_group}>
                <Field
                  type="text"
                  name="website"
                  className={s.form_control}
                  placeholder="Website"
                />
                <ErrorMessage
                  name="website"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.form_group}>
                <Field
                  type="text"
                  name="telegram"
                  className={s.form_control}
                  placeholder="Telegram"
                />
                <ErrorMessage
                  name="telegram"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className="form-group checkbox-group">
                <Field
                  type="checkbox"
                  name="agreeToTerms"
                  className={s.form_control}
                />
                <label htmlFor="agreeToTerms">
                  I agree to our <a href="/privacy-policy">Privacy Policy</a>{" "}
                  and <a href="/terms">Terms</a>.
                </label>
                <ErrorMessage
                  name="agreeToTerms"
                  component="div"
                  className={s.error}
                />
              </div>

              <button
                type="submit"
                className={s.submit_button}
                disabled={isSubmitting}
              >
                Create
              </button>
            </Form>
          )}
        </Formik>
        <p>
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
}