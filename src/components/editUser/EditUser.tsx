import React, { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  updateUser,
  selectUser,
  user as fetchCurrentUser,
} from "../../features/auth/authSlice"
import { useNavigate } from "react-router-dom"

const EditUser: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentUser = useAppSelector(selectUser)
  const [initialValues, setInitialValues] = useState({
    id: 0,
    email: "",
    fullName: "",
    avatar: "",
    website: "",
    phone: "",
    telegram: "",
  })

  useEffect(() => {
    if (!currentUser) {
      dispatch(fetchCurrentUser())
    } else {
      setInitialValues({
        id: currentUser.id,
        email: currentUser.email,
        fullName: currentUser.fullName,
        avatar: currentUser.avatar,
        website: currentUser.website,
        phone: currentUser.phone,
        telegram: currentUser.telegram,
      })
    }
  }, [dispatch, currentUser])

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    fullName: Yup.string().required("Full name is required"),
    avatar: Yup.string(),
    website: Yup.string(),
    phone: Yup.string().matches(/^[0-9]+$/, "Phone number is invalid"),
    telegram: Yup.string(),
  })

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any,
  ) => {
    try {
      if (values.id) {
        await dispatch(updateUser({ user: values, id: values.id }))
        navigate(`/personalCabinet/${currentUser?.login}`)
      }
      resetForm()
    } catch (error) {
      console.error("Error: ", error)
    } finally {
      setSubmitting(false)
    }
  }

  if (!currentUser) {
    return <div>Loading...</div>
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
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />

            <Field type="text" name="fullName" placeholder="Full Name" />
            <ErrorMessage name="fullName" component="div" />

            <Field type="text" name="avatar" placeholder="Avatar" />
            <ErrorMessage name="avatar" component="div" />

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
  )
}

export default EditUser
