import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { changePassword, selectUser } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from "./newPassword.module.css"

export default function NewPassword() {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value); // Обновляем состояние нового пароля при изменении ввода
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы


    try {
      await dispatch(changePassword(newPassword)); 
      alert('Password changed successfully');
      navigate('/');
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
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Change</button>
      </form>
    </div>
    </div>
  );
}