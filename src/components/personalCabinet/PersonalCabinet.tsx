import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { deletePet, getPets, getPetsByFilter, selectPets } from "../../features/pets/petsSlice"
import { Link, useParams } from "react-router-dom"
import s from "./personalCabinet.module.css"
import CreatePet from "../../features/pets/createPet/CreatePet"

export default function PersonalCabinet() {

  const {author} = useParams<{author:string}>();
  const petsList = useAppSelector(selectPets)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPetsByFilter({author}))
  }, [dispatch, author])

  return (
    <div className={s.cabinet}>
      <div className={s.avert_container}>
        <div>
          {/* <button onClick={}>Add new avert</button> */}
          {/* <CreatePet /> */}
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
