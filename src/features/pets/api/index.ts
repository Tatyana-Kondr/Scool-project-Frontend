import type { Pet, PetDTO } from "../types"

//type ServerGetPetResponse = Pet[]
export interface FilterParamDto {
  petType?: string | null
  country?: string | null
  category?: string | null
  age?: string | null
  gender?: string | null
  author?: string | null
}

export async function fetchPetsByFilter(
  filterParam: FilterParamDto,
): Promise<Pet[]> {
  let queryString = ""
  // queryString += `petType=${filterParam.petType}&`
  queryString += filterParam?.petType ? `petType=${filterParam.petType}&` : ""
  queryString += filterParam?.country ? `country=${filterParam.country}&` : ""
  queryString += filterParam?.category
    ? `category=${filterParam.category}&`
    : ""
  queryString += filterParam?.age ? `age=${filterParam.age}&` : ""
  queryString += filterParam?.gender ? `gender=${filterParam.gender}&` : ""
  queryString += filterParam?.author ? `author=${filterParam.author}` : ""

  const res = await fetch(`/api/pet/found?${queryString}`)
  return res.json()
}

export async function fetchPets(): Promise<Pet[]> {
  const res = await fetch("/api/pet/found", {
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  return res.json()
}

export async function fetchPetsByType(petType: string): Promise<Pet[]> {
  const res = await fetch(`/api/pet/found?petType=${petType}`)
  return res.json()
}
export async function fetchPetsByAuthor(author: string): Promise<Pet[]> {
  const res = await fetch(`/api/pet/found?author=${author}`)
  return res.json()
}

export async function fetchPet(id: string): Promise<Pet> {
  const res = await fetch(`/api/pet/found/id/${id}`)
  return res.json()
}

export async function fetchPetsByCountry(country: string): Promise<Pet[]> {
  const res = await fetch(`/api/pet/found?country=${country}`)
  return res.json()
}
export async function fetchPetsByGender(gender: string): Promise<Pet[]> {
  const res = await fetch(`/api/pet/found?gender=${gender}`)
  return res.json()
}

interface ServerDeleteProductResponse extends Pet {
  isDeleted: boolean
}

export async function fetchDeletePet(
  id: string,
): Promise<ServerDeleteProductResponse> {
  const res = await fetch(`/api/pet/${id}`, {
    method: "DELETE",
  })
  return res.json()
}

// export async function fetchAddPet(
//   petDTO: PetDTO,
// ): Promise<Pet> {
//   const res = await fetch(`/api/pet`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json",
//     accept: "*/*",
//     authorization: `Bearer ${localStorage.getItem("token")}`
//      },
//     body: JSON.stringify(petDTO),
//   })
//   return res.json()
// }
export async function fetchAddPet(petDTO: PetDTO): Promise<Pet> {
  try {
    const res = await fetch(`/api/pet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(petDTO),
    })

    if (!res.ok) {
      const errorDetails = await res.json()
      console.error(
        "Failed to add pet:",
        res.status,
        res.statusText,
        errorDetails,
      )
      throw new Error(`Failed to add pet: ${res.status} ${res.statusText}`)
    }

    return res.json()
  } catch (error) {
    console.error("Error during fetchAddPet:", error)
    throw error
  }
}
