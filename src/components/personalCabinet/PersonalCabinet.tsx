import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getPets, selectPets } from "../../features/pets/petsSlice"
import { Link } from "react-router-dom"
import s from "./personalCabinet.module.css"
import CreatePet from "../../features/pets/createPet/CreatePet"

export default function PersonalCabinet() {
  const petsList = useAppSelector(selectPets)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPets())
  }, [dispatch])

  return (
    <div className={s.cabinet}>
      <div className={s.avert_container}>
        <div>
          {/* <button onClick={}>Add new avert</button> */}
          {/* <CreatePet /> */}
          <Link to="/createPet">Add new avert</Link>
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
                <button type="button">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
