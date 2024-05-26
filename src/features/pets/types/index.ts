export interface Pet {
  id: number
  author: string
  caption: string
  petType: string
  category: string
  gender: string
  age: string
  photos: Set<string>
  country: string
  city: string
  description: string
  photoUrls: Set<string>
  dateCreate: string
  deadline: string
}

export interface PetsState {
  petsList: Pet[]
  selectedPet: Pet | undefined
}

export interface PetDTO {
  //Для создания нового поста о животном
  caption: string
  petType: string
  category: string
  gender: string
  age: string
  country: string
  city: string
  description: string
}
