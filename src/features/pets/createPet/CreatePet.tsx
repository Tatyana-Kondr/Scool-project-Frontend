import React, { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../app/hooks"
import { addPet } from "../petsSlice"
import { PetDTO } from "../types"
import {
  sexList,
  countryList,
  ageList,
  categoryList,
  petTypeList,
} from "../petsList/data"

export default function CreatePet() {
  const [formData, setFormData] = useState<PetDTO>({
    caption: "",
    petType: "",
    category: "",
    gender: "",
    age: "",
    photo: [],
    country: "",
    city: "",
    description: "",
  })
  const [message, setMessage] = useState<string>("")

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(formData)
    if (validate()) {
      dispatch(addPet(formData))
      clearInputs()
      navigate("/personalCabinet")
    }
  }

  function validate(): boolean {
    if (formData.caption.trim().length > 0) {
      setMessage("")
      return true
    } else {
      setMessage("The title shouldn't be empty")
      return false
    }
  }

  function clearInputs() {
    setFormData({
      caption: "",
      petType: "",
      category: "",
      gender: "",
      age: "",
      photo: [""],
      country: "",
      city: "",
      description: "",
    })
  }

  function handlePhotoChange(index: number, e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (files && files[0]) {
      const newPhotos = [...formData.photo]
      newPhotos[index] = URL.createObjectURL(files[0])
      setFormData({ ...formData, photo: newPhotos })
    }
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        {message ? <span>{message}</span> : null}

        <div>
          <label htmlFor="caption">Title</label>
          <input
            type="text"
            value={formData.caption}
            onChange={e =>
              setFormData({ ...formData, caption: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="petType">Pet Type</label>
          <select
            name="petType"
            value={formData.petType}
            onChange={e =>
              setFormData({ ...formData, petType: e.target.value })
            }
          >
            <option value="">Select type</option>
            {petTypeList.map(pet => (
              <option key={pet.value} value={pet.value}>
                {pet.value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={e =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select category</option>
            {categoryList.map(pet => (
              <option key={pet.value} value={pet.value}>
                {pet.value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="gender">Sex</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={e => setFormData({ ...formData, gender: e.target.value })}
          >
            <option value="">Select sex</option>
            {sexList.map(pet => (
              <option key={pet.value} value={pet.value}>
                {pet.value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <select
            name="age"
            value={formData.age}
            onChange={e => setFormData({ ...formData, age: e.target.value })}
          >
            <option value="">Select age</option>
            {ageList.map(pet => (
              <option key={pet.value} value={pet.value}>
                {pet.value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <select
            name="petType"
            value={formData.country}
            onChange={e =>
              setFormData({ ...formData, country: e.target.value })
            }
          >
            <option value="">Select country</option>
            {countryList.map(pet => (
              <option key={pet.value} value={pet.value}>
                {pet.value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="City">City</label>
          <input
            type="text"
            value={formData.city}
            onChange={e => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="Description">Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={e =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="photo1">Main photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => handlePhotoChange(0, e)}
          />
        </div>

        <div>
          <label htmlFor="photo2">Photo 2</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => handlePhotoChange(1, e)}
          />
        </div>
        <div>
          <label htmlFor="photo3">Photo 3</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => handlePhotoChange(1, e)}
          />
        </div>
        <div>
          <label htmlFor="photo4">Photo 4</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => handlePhotoChange(1, e)}
          />
        </div>

        <button type="submit">Add pet</button>
      </form>
    </div>
  )
}
