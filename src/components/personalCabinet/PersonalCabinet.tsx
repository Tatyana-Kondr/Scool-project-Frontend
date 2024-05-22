import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  deletePet,
  getPets,
  getPetsByFilter,
  selectPets,
} from "../../features/pets/petsSlice"
import { Link, useNavigate, useParams } from "react-router-dom"
import s from "./personalCabinet.module.css"
import { deleteUser, selectUser } from "../../features/auth/authSlice"

export default function PersonalCabinet() {
  const { author } = useParams<{ author: string }>()
  const petsList = useAppSelector(selectPets)
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPetsByFilter({ author }))
  }, [dispatch, author])

  const handleDeleteAccount = async () => {
    if (user) {
      const result = await dispatch(deleteUser(user.id));
      if (deleteUser.fulfilled.match(result)) {
        navigate('/'); // Перенаправление на домашнюю страницу
      } else {
        console.error('Failed to delete user:', result.error.message);
      }
    }
  }; 
  return (
    <div className={s.cabinet}>
      <div className={s.profile_container}>
        <h1>My account</h1>
        <h2>{user?.fullName}</h2>
        <div className={s.contact}>
          <label htmlFor="email">Email:</label>
          <p>{user?.email}</p>
        </div>
        <div className={s.contact}>
          <label htmlFor="phone">Phone:</label>
          <p>{user?.phone}</p>
        </div>
        <div className={s.contact}>
          <label htmlFor="website">Website:</label>
          <p>{user?.website}</p>
        </div>

        <div>
          <Link to={`/editUser`}>Change personal details</Link>
          <Link to={`/newPassword`}>Change password</Link>
          <button onClick={handleDeleteAccount}>Delete account</button>
        </div>
      </div>

      <div className={s.avert_container}>
        <div>
          <Link to="/createPet/">Add new avert</Link>
        </div>
        <ul>
          {petsList.map(p => (
            <li key={p.id}>
              <div className={s.avert_card}>
                <div className={s.avert_img}>
                  <img src={p.photo[0]} alt="" />
                </div>
                <Link to={String(p.id)}>{p.caption}</Link>
                <Link to={`/editPet/${p.id}`}>Edit</Link>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(deletePet(p.id))
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
