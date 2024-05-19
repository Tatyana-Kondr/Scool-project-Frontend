import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useAppDispatch } from "../../app/hooks"
import { register } from "../../features/auth/authSlice"
import { useNavigate } from "react-router-dom"

export default function Register() {
  
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  return (
    <div>
      <h1>Sign up</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          fullName: "",
          login: "",
          avatar: "",
          website: "",
          phone: "",
          telegram: "",
        }}
        onSubmit={async(values, { setSubmitting, resetForm }) => {
            try{
            await dispatch(register(values))
            resetForm() // очищаем форму
            navigate("/")
            }
            catch(error){
              console.error("Ошибка при регистрации: ", error)
            } finally{
              setSubmitting(false)
            }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" placeholder="email" />
            <ErrorMessage name="email" component="div" />

            <Field type="password" name="password" placeholder="password" />
            <ErrorMessage name="password" component="div" />

            <Field type="fullName" name="fullName" placeholder="full name" />
            <ErrorMessage name="fullName" component="div" />

            <Field type="login" name="login" placeholder="login" />
            <ErrorMessage name="login" component="div" />

            <Field type="avatar" name="avatar" placeholder="avatar" />
            <ErrorMessage name="avatar" component="div" />

            <Field type="website" name="website" placeholder="website" />
            <ErrorMessage name="website" component="div" />

            <Field type="phone" name="phone" placeholder="phone" />
            <ErrorMessage name="phone" component="div" />

            <Field type="telegram" name="telegram" placeholder="telegram" />
            <ErrorMessage name="telegram" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
