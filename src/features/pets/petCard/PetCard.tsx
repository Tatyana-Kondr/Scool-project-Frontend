import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useEffect, useState } from "react"
import style from "./PetCard.module.css"
import { getPet, getPhotoById, selectPet } from "../petsSlice"
import PageNotFound from "../../../components/pageNotFound"
import { author, selectUser } from "../../auth/authSlice"
import { User } from "../../auth/types"
import Modal from "../../../components/modalProps/ModalProps"
import { Pet } from "../types"

export default function PetCard() {

  const currentUser = useAppSelector(selectUser)
  const { petId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const pet = useAppSelector(selectPet)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [authorData, setAuthorData] = useState<User | null>(null)
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null)

  // useEffect(() => {
  //   if (petId) {
  //     dispatch(getPet(Number(petId)))
  //   }
  // }, [dispatch, petId])

  // useEffect(() => {
  //   if (petId) {
  //     dispatch(getPet(Number(petId))).then(action => {
  //       const petData = action.payload as Pet;
  //       if (petData && petData.photos) {
  //         petData.photos.forEach((photoId: number):void => {
  //           dispatch(getPhotoById(photoId));
  //         });
  //       }
  //     });
  //   }
  // }, [dispatch, petId]);
  

  const handleUser = async () => {
    
    if (currentUser && pet && pet.author) {
      try {
        const response = await dispatch(author(pet.author))
        const userData = response.payload as User
        const handleSendEmail = () => {
              const subject = encodeURIComponent("Interest in your pet ad");
              const body = encodeURIComponent(`Hello,\n\nI am interested in your pet announcement: ${pet.caption}.`);
              window.location.href = `mailto:${userData.email}?subject=${subject}&body=${body}`;
            }
        if (userData && "fullName" in userData) {
          setAuthorData(userData)
          setModalContent(
            <div>
              <p>Name: {userData.fullName}</p>
              <button onClick={handleSendEmail}>Email: {userData.email}</button>
              <p>Phone: {userData.phone}</p>
              <p>Telegram: {userData.telegram}</p>
              <p>Website: {userData.website}</p>
            </div>,
          )
          setIsModalOpen(true)
        }
      } catch (error) {
        console.error("Error when getting the author's data: ", error)
      }
    } else {
      setModalContent(
        <div className={style.modal_error}>
          <p>Only registered users can view contacts!</p>
        </div>,
      )
      setIsModalOpen(true)
    }
  }

  if (!pet) {
    return <PageNotFound />
  }

  return (
    <div className={style.box}>
      <h2>{pet.caption}</h2>
      <img 
        src={pet.photoUrls[0]} 
        alt={pet.caption} 
        style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '10px' }}
      />
      <p>{pet.description}</p>
      <p>{pet.dateCreate}</p>
      <p>{pet.author}</p>

      <button onClick={() => navigate(-1)}>  To previous page  </button>
      {/* <button onClick={handleUser} disabled={!currentUser || !pet || !pet.author}> Contacts </button> */}
      
      {/* <button onClick={handleSendEmail}>Send a message</button>        */}
      <button onClick={handleUser}> Contacts </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Contact details:"
      >
        {modalContent}
      </Modal>
    </div>
  )
}
