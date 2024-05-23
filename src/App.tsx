import { Route, Routes } from "react-router-dom"
import "./App.css"
import MainLayout from "./layouts/mainLayout/MainLayout"
import Home from "./components/home/Home"
import NoPageFound from "./components/pageNotFound"
import PetsList from "./features/pets/petsList/PetsList"
import PetCard from "./features/pets/petCard/PetCard"
import PersonalCabinet from "./components/personalCabinet/PersonalCabinet"
import Register from "./components/register/Register"
import LoginForm from "./components/login/LoginForm"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { selectIsAuthenticated, user } from "./features/auth/authSlice"
import CreatePet from "./features/pets/createPet/CreatePet"
import NewPassword from "./components/newPassword/NewPassword"
import EditUser from "./components/editUser/EditUser"
import UserList from "./features/auth/userList/userList"
import EditPet from "./features/pets/editPet/editPet"

const App = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(user())
    }
  }, [isAuthenticated])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="loginForm" element={<LoginForm />} />
          <Route path="register" element={<Register />} />
          <Route path="personalCabinet/:author" element={<PersonalCabinet />} />
          <Route path="editUser" element={<EditUser />} />
          <Route path="editPet/:petId" element={<EditPet />} />
          <Route path="newPassword" element={<NewPassword />} />
          <Route path="createPet" element={<CreatePet />} />
          <Route path="userList" element={<UserList />} />
          <Route path="pets" element={<PetsList />} />
          <Route path="petCard/:petId" element={<PetCard />} />
          <Route path="*" element={<NoPageFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
