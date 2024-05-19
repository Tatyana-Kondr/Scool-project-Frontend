import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getPets, getPetsByFilter, selectPets } from "../../features/pets/petsSlice"
import { Link, useParams } from "react-router-dom"
import s from "./personalCabinet.module.css"
import { StringParam, useQueryParams } from "use-query-params"
import { user, selectUser } from "../../features/auth/authSlice"
import { string } from "yup"

export default function PersonalCabinet() {
  const {author} = useParams<{author: string}>();
  const petsList = useAppSelector(selectPets);
  
  const dispatch = useAppDispatch();
 

  useEffect(() => {
    dispatch(getPetsByFilter({author}))
  }, [dispatch, author])

  useEffect(() => {
    dispatch(user())
  }, [dispatch])

  return (
    <div className={s.cabinet}>
      <div className={s.avert_container}>
        <div>
          <Link to="/createPet">Add new avert</Link>
        </div>
        <ul>
          {petsList.map(p => (
            <li key={p.id}>
              <div className={s.avert_card}>
                <div className={s.avert_img}>
                  <img src={p.photo[0]} alt={p.caption} />
                </div>
                <Link to={`/pets/${p.id}`}>{p.caption}</Link>
                <button type="button">Edit</button>
                <button type="button">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
