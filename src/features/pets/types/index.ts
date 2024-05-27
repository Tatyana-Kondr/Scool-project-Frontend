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
<<<<<<< HEAD
  photoUrls:string[]
=======
  photoUrls: Set<string>
>>>>>>> c7d79b46c6de79ea94fe638b06a8db6df89b2a02
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
