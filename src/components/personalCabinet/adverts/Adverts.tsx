import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deletePet, getPet, getPetsByFilter, selectPet, selectPets } from '../../../features/pets/petsSlice';
import s from "./adverts.module.css";

export default function Adverts() {
  
    const { author } = useParams<{ author: string }>();
    const petsList = useAppSelector(selectPets);
    const pet = useAppSelector(selectPet);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(getPetsByFilter({ author }));
    }, [dispatch, author]);

    useEffect(() => {
      if(pet){
        dispatch(getPet(pet?.id));
      }
      }, [dispatch, pet?.id]);
  
    return (
      <div className={s.avert_container}>
        <div className={s.avert_cards_wrapper}>
          {petsList.map((p) => (
            <div key={p.id} className={s.avert_card}>
                <span className={s.avert_deadline}>{`active until: ${p.deadline}`}</span>
              <div className={s.avert_details}>
                <Link className={s.avert_caption} to={`/petCard/${p.id}`}>{p.caption}</Link>
                <div className={s.avert_buttons}>
                <Link to={`/editPet/${p.id}`}>Edit</Link>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(deletePet(p.id));
                  }}
                >
                  Delete
                </button>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
