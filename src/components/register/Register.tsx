import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useAppDispatch } from "../../app/hooks"
import { register } from "../../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import s from "./register.module.css"

export default function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

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

  // const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.currentTarget.files[0]
  //   if (file) {
  //     setAvatarPreview(URL.createObjectURL(file))
  //   }
  // }

  const lapa = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="25"
      viewBox="0 0 28 25"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.68377 19.0218C3.39245 20.4605 5.78355 20.2653 8.07227 20.0892C10.9784 19.8653 11.6757 20.5586 13.2568 21.4566C14.1611 21.9703 17.0692 23.3916 18.563 21.7467C19.7664 20.4218 18.8975 18.2174 18.3313 16.5537C17.1202 12.9945 15.0824 9.94793 9.87078 12.1492C8.19154 12.8584 6.43402 14.1541 5.17752 15.0756C3.95612 15.9712 1.83495 17.2984 2.68377 19.0218Z"
        fill="#68D74E"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.7905 2.42187C6.26229 4.25888 7.80254 10.5576 12.3615 8.83617C16.6322 7.22346 15.4311 0.539428 10.7905 2.42187Z"
        fill="#68D74E"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.4922 4.04814C13.9755 5.61419 15.2387 12.1932 20.0179 10.1749C24.5853 8.24608 23.0903 2.45402 18.4922 4.04814Z"
        fill="#68D74E"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M25.6594 12.4207C26.8701 8.95018 19.7688 10.0612 18.8948 13.2693C17.7865 17.3376 24.6116 15.4253 25.6594 12.4207Z"
        fill="#68D74E"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.00988 7.34417C2.3551 7.72704 1.94628 8.00114 1.84203 8.83947C1.74517 9.61975 2.02138 10.3795 2.44311 10.9881C3.04483 11.856 4.58038 13.1382 6.32326 12.1186C8.68769 10.7357 6.01002 5.58916 3.00988 7.34417Z"
        fill="#68D74E"
      />
    </svg>
  )

  return (
    <div className={s.register}>
      <div className={s.register_container}>
        <h2>Create your account</h2>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await dispatch(register(values))
              resetForm() // очищаем форму
              navigate("/")
            } catch (error) {
              console.error("Ошибка при регистрации: ", error)
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className={s.register_form}>
              {/* <div className={s.avatar_upload}>
                <div className={s.avatar_preview}>
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar Preview" />
                  ) : (
                    <div className={s.avatar_placeholder}">
                      <span>+</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={event => {
                    handleAvatarChange(event)
                    if (event.currentTarget.files) {
                      setFieldValue("avatar", event.currentTarget.files[0])
                    }
                  }}
                />
                <ErrorMessage name="avatar" component="div" className="error" />
              </div> */}

              <div className={s.form_group}>
                <label htmlFor="fullname" className={s.required_field}>
                  {lapa}
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
                  {lapa}
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
                  {lapa}
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
                  {lapa}
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
  )
}
