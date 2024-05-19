import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useEffect, useState } from "react"
import style from "./PetCard.module.css"
import { getPet, selectPet } from "../petsSlice"
import PageNotFound from "../../../components/pageNotFound"
import { author, selectUser } from "../../auth/authSlice"
import { User } from "../../auth/types"
import Modal from "../../../components/modalProps/ModalProps"

export default function PetCard() {
  const currentUser = useAppSelector(selectUser)
  const { petId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const pet = useAppSelector(selectPet)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [authorData, setAuthorData] = useState<User | null>(null)
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null)

  useEffect(() => {
    if (petId) {
      dispatch(getPet(Number(petId)))
    }
  }, [dispatch, petId])

//   if (currentUser && pet && pet.author) {
//     const response = await dispatch(author(pet.author))
//   const ownerEmail = (response.payload as User).email
  
  
//   const handleSendEmail = () => {
//     const subject = encodeURIComponent("Интерес к вашему объявлению о животном");
//     const body = encodeURIComponent(`Здравствуйте,\n\nЯ заинтересован в вашем объявлении о животном: ${pet.caption}.`);
//     window.location.href = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
//   }
// };

  const handleUser = async () => {
    if (currentUser && pet && pet.author) {
      try {
        const response = await dispatch(author(pet.author))
        const userData = response.payload as User
        const handleSendEmail = () => {
              const subject = encodeURIComponent("Интерес к вашему объявлению о животном");
              const body = encodeURIComponent(`Здравствуйте,\n\nЯ заинтересован в вашем объявлении о животном: ${pet.caption}.`);
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
        console.error("Ошибка при получении данных автора: ", error)
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
      {/* <img src={pet.photo[0]} alt={pet.caption} /> */}
      <p>{pet.description}</p>
      <p>{pet.dateCreate}</p>
      <p>{pet.author}</p>

      <button onClick={() => navigate(-1)}>To previous page</button>

      <button onClick={handleUser}>Contacts</button>
      {/* <button onClick={handleSendEmail}>Send a message</button> */}

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
