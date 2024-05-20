import type { Pet, PetDTO } from "../types"

//type ServerGetPetResponse = Pet[]
export interface FilterParamDto {
  petType?: string | null;
  country?: string | null;
  category?: string | null;
  age?: string | null;
  gender?: string | null;
  author?: string | null;
}

export async function fetchPetsByFilter(filterParam: FilterParamDto): Promise<Pet[]> {
  let queryString = ""
  queryString += filterParam?.petType ?`petType=${filterParam.petType}&` :""
  queryString += filterParam?.country ? `country=${filterParam.country}&` :""
  queryString += filterParam?.category ? `category=${filterParam.category}&` :""
  queryString += filterParam?.age ? `age=${filterParam.age}&` :""
  queryString += filterParam?.gender ? `gender=${filterParam.gender}&` :""
  queryString += filterParam?.author ? `author=${filterParam.author}` :""

  const res = await fetch(`/api/pet/found?${queryString}`);
  return res.json();
}  


export async function fetchPets(): Promise<Pet[]> {
  const res = await fetch("/api/pet/found")
  return res.json()
}

export async function fetchPetsByType(petType: string): Promise<Pet[]> {
  const res = await fetch(`/api/pet/found?petType=${petType}`)
  return res.json()
}

 
export async function fetchPet(id: number): Promise<Pet> {
   const res = await fetch(`/api/pet/${id}`)
   return res.json()
 }



interface ServerDeletePetResponse extends Pet {
  isDeleted: boolean
}

export async function fetchDeletePet(
  id: number,
): Promise<ServerDeletePetResponse> {
  const res = await fetch(`/api/pet/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", 
    accept: "*/*",
    authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  return res.json()
}

export async function fetchAddPet(
  petDTO: PetDTO,
): Promise<Pet> {
  const res = await fetch(`/api/pet`, {
    method: "POST",
    headers: { "Content-Type": "application/json", 
    accept: "*/*",
    authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(petDTO),
  })
  return res.json()
}
