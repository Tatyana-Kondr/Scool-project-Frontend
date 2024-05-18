import { Route, Routes } from "react-router-dom"
import "./App.css"
import MainLayout from "./layouts/mainLayout/MainLayout"
import Home from "./components/home/Home"
import NoPageFound from "./components/pageNotFound"
import Login from "./components/login/Login"
import PetsList from "./features/pets/petsList/PetsList"
import PetCard from "./features/pets/petCard/PetCard"
import PersonalCabinet from "./components/personalCabinet/PersonalCabinet"
import CreatePet from "./features/pets/createPet/CreatePet"
import Register from "./components/register/Register"
import LoginForm from "./components/login/LoginForm"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { selectIsAuthenticated, user } from "./features/auth/authSlice"

const App = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(user())
    }
  }, [isAuthenticated, dispatch])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="loginForm" element={<LoginForm />} />
          <Route path="register" element={<Register />} />
          <Route path="personalCabinet" element={<PersonalCabinet />} />
          <Route path="createPet" element={<CreatePet />} />
          <Route path="pets" element={<PetsList />} />
          <Route path="pets/:petId" element={<PetCard />} />
          <Route path="*" element={<NoPageFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
