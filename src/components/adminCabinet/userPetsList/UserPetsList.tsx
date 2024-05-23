import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { deletePet, getPetsByFilter, selectPets } from '../../../features/pets/petsSlice'
import { useNavigate, useParams } from 'react-router-dom';

export default function UserPetsList() {

    const pets = useAppSelector(selectPets);
    const {login} = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getPetsByFilter({author: login}));
    }, [dispatch, login])

    
  return (
    <div>
        <h1>{login}'s Pets</h1>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            <p>{pet.caption}</p>
            <p>{pet.description}</p>
            <p>{pet.deadline}</p>
            <button onClick={()=>dispatch(deletePet(pet.id))}> Delete </button>                        
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(-1)}> Back </button>
    </div>
  )
}
