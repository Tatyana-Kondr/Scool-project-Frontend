import { createAppSlice } from "../../app/createAppSlice"
import { FilterParamDto, fetchAddPet, fetchDeletePet, fetchPet, fetchPets, fetchPetsByFilter, fetchPetsByType } from "./api"
import type { PetDTO, PetsState } from "./types"

const initialState: PetsState = {
  petsList: [],
  selectedPet: undefined
}

export const petsSlice = createAppSlice({
  name: "pets",
  initialState,
  reducers: create => ({
    getPets: create.asyncThunk(
      async (arg: void) => {
        const response = await fetchPets()
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          state.petsList = action.payload
        },
        rejected: state => {},
      },
    ),
    getPetsByType: create.asyncThunk(
      async (petType: string) => {
        const response = await fetchPetsByType(petType)
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          state.petsList = action.payload
        },
        rejected: state => {},
      },
    ),
    
        getPetsByFilter: create.asyncThunk(
      async (filters: FilterParamDto) => {
        const response = await fetchPetsByFilter(filters)
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          state.petsList = action.payload
        },
        rejected: state => {},
      },
    ),
    
    deletePet: create.asyncThunk(
      async (id: number) => {
        const response = await fetchDeletePet(id)
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          state.petsList = state.petsList.filter(p => p.id !== action.payload.id)
        },
        rejected: state => {},
      },
    ),
     getPet: create.asyncThunk(
       async (id: number) => {
         const response = await fetchPet(id)
         return response
       },
       {
         pending: state => {},
         fulfilled: (state, action) => {
          state.selectedPet = action.payload
         },
         rejected: state => {},
       },
     ),
    addPet: create.asyncThunk(
      async (petDTO: PetDTO) => {
        const response = await fetchAddPet(petDTO)
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
         state.petsList.push(action.payload)
        },
        rejected: state => {},
      },
    ),
  }),
  selectors: {
    selectPets: petsState => petsState.petsList,
    selectPet: petsState => petsState.selectedPet,
  },
})

export const { getPets, getPet, getPetsByType, getPetsByFilter, deletePet, addPet } = petsSlice.actions

export const { selectPets, selectPet } = petsSlice.selectors
