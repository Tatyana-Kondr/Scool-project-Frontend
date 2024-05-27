import { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { FilterParamDto, fetchAddPet, fetchDeletePet, fetchEditPet, fetchPet, fetchPets, fetchPetsByFilter, fetchPetsByType, fetchPhotoById } from "./api"
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
          state.selectedPet = action.payload;
          state.selectedPet.photoUrls = []; // Инициализируем массив photoUrls
          
         },
         rejected: state => {},
       },
     ),

     getPhotoById: create.asyncThunk(
      async (id: number) => {
        const response = await fetchPhotoById(id)
        return URL.createObjectURL(response);// преобразуем Blob в URL для отображения изображения
      },
      {
        pending: state => {},
        fulfilled: (state, action: PayloadAction<string>) => {
          if (state.selectedPet) {
            state.selectedPet.photoUrls.push(action.payload);  
          }         
        },
        rejected: state => {},
      },
    ),

    addPet: create.asyncThunk(
      async ({petDTO, files}) => {
        const response = await fetchAddPet(petDTO, files)
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

    editPet: create.asyncThunk(
      async ({petDTO, id}: {petDTO: PetDTO, id:number}) => {
        const response = await fetchEditPet(petDTO, id)
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
        //  state.selectedPet = action.payload;
         state.petsList = state.petsList.map(p=>{
          if(p.id===action.payload.id){
            return action.payload
          } 
          return p;          
        })
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

export const { getPets, getPet, getPhotoById, getPetsByType, getPetsByFilter, deletePet, addPet, editPet } = petsSlice.actions

export const { selectPets, selectPet } = petsSlice.selectors
