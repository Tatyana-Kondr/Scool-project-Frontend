import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getPets, getPetsByFilter, selectPets } from "../../features/pets/petsSlice"
import { Link } from "react-router-dom"
import s from "./personalCabinet.module.css"
import { StringParam, useQueryParams } from "use-query-params"
import { getUser, selectUser } from "../../features/auth/authSlice"

export default function PersonalCabinet() {
  const petsList = useAppSelector(selectPets)
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [queryParams, setQueryParams] = useQueryParams({
    author: StringParam,
  })

  useEffect(() => {
    dispatch(getPetsByFilter(queryParams))
  }, [dispatch, queryParams])

  useEffect(() => {
    dispatch(getUser())
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
