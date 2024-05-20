import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  deletePet,
  getPets,
  getPetsByFilter,
  selectPets,
} from "../../features/pets/petsSlice"
import { Link, useParams } from "react-router-dom"
import s from "./personalCabinet.module.css"
import { deleteUser, selectUser } from "../../features/auth/authSlice"

export default function PersonalCabinet() {
  const { author } = useParams<{ author: string }>()
  const petsList = useAppSelector(selectPets)
  const user = useAppSelector(selectUser)
  const {id} = useParams<{ id: string }>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPetsByFilter({ author }))
  }, [dispatch, author])

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
          <Link to={`/newPassword${user?.id}`}>Change password</Link>
          <button onClick={() => dispatch(deleteUser(Number(id)))}>Delete account</button>
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
                <button type="button">Edit</button>
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
