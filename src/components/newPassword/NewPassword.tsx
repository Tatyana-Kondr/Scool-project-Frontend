// import React, { useState } from 'react';
// import { useAppDispatch } from '../../app/hooks';
// import { changePassword, selectUser } from '../../features/auth/authSlice';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import * as Yup from "yup"
// import styles from "./newPassword.module.css"

// export default function NewPassword() {

//   const dispatch = useAppDispatch();
//   const currentUser = useSelector(selectUser);
//   const navigate = useNavigate();
//   const [passwordData, setPasswordData] = useState({oldPassword: '', newPassword: ''});

//   const validationSchema = Yup.object().shape({
//     login: Yup.string().required("Username is required"),
//     password: Yup.string()
//       .min(4, "Password must be at least 4 characters")
//       .required("Password is required"),
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setPasswordData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       await dispatch(changePassword(passwordData)); 
//       alert('Password changed successfully');
//       navigate(`/personal_cabinet/${currentUser?.login}`);
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Error changing password');
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.box_front}>
//       <h2>Change Password</h2>
//       <h1>{currentUser?.login}</h1>
//       <form onSubmit={handleSubmit}>
//       <input
//             type="password"
//             name="oldPassword"
//             placeholder="Old Password"
//             value={passwordData.oldPassword}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="newPassword"
//             placeholder="New Password"
//             value={passwordData.newPassword}
//             onChange={handleChange}
//             required
//           />
//         <button type="submit">Change</button>
//       </form>
//     </div>
//     </div>
//   );
// }

import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { changePassword, selectUser } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from "./newPassword.module.css";

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Old Password is required"),
  newPassword: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("New Password is required"),
});

export default function NewPassword() {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();

  const handleSubmit = async (values: { oldPassword: string; newPassword: string }) => {
    try {
      await dispatch(changePassword(values));
      alert('Password changed successfully');
      navigate(`/personal-cabinet/${currentUser?.login}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Error changing password');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box_front}>
        <h2>Change Password</h2>
        <h1>{currentUser?.login}</h1>
        <Formik
          initialValues={{ oldPassword: '', newPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={styles.formGroup}>
                <Field
                  type="password"
                  name="oldPassword"
                  placeholder="Old Password"
                  className={styles.input}
                />
                <ErrorMessage name="oldPassword" component="div" className={styles.error} />
              </div>
              <div className={styles.formGroup}>
                <Field
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  className={styles.input}
                />
                <ErrorMessage name="newPassword" component="div" className={styles.error} />
              </div>
              <button type="submit" disabled={isSubmitting} className={styles.button}>
                Change
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}