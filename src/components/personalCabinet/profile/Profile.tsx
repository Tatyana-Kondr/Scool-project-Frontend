import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../../features/auth/authSlice";
import s from "./profile.module.css"
export default function Profile() {

  const user = useAppSelector(selectUser);

  return (
    <div className={s.profile_container}>
      <h1>My profile</h1>
      <div className={s.profile_header}>
        <h2>{user?.fullName}</h2>
        <div className={s.avatar_preview}>
          {user?.photoUrls && (
            <img
              src={`${"http://localhost:8080"}${user.photoUrls}`}
              alt="User Avatar"
            />
          )}
        </div>
      </div>
      <div className={s.contact}>
        <label htmlFor="email">Email:</label>
        <span>{user?.email}</span>
      </div>
      <div className={s.contact}>
        <label htmlFor="phone">Phone:</label>
        <span>{user?.phone}</span>
      </div>
      <div className={s.contact}>
        <label htmlFor="website">Website:</label>
        <a 
          className={s.a_contact} 
          href={`https://${user?.website}`} 
          target="_blank" rel="noopener noreferrer">
            {user?.website}
        </a>
      </div>

      <div className={s.profile_changes}>
        <Link to={`/editUser`} className={s.link}>Change personal details</Link>
        <Link to={`/newPassword`} className={s.link}>Change password</Link>
      </div>
    </div>
  );
}
