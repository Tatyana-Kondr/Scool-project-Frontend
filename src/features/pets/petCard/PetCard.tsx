import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useEffect } from "react"
import style from "./PetCard.module.css"
import { getPet, selectPet } from "../petsSlice"
import PageNotFound from "../../../components/pageNotFound"

export default function PetCard() {
  const { petId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
   const pet = useAppSelector(selectPet)
   useEffect(() => {
     dispatch(getPet(String(petId)))
  }, [dispatch])
   if (pet) {
     return (
       <div className={style.box}>
         <h2>{pet?.caption}</h2>
         {/*<img src={pet.photo[0]} alt={pet?.caption} />*/}
         <p>{pet?.description}</p>
         <Link to="/pets">To pets</Link>
         <button onClick={() => navigate(-1)}>To previous page</button>
       </div>
     )
   } else {
     return <PageNotFound />
   }
}
