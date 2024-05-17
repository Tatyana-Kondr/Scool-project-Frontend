import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { Form, useNavigate } from "react-router-dom";
import { PetDTO } from "../types";
import { Field, Formik, FormikHelpers } from "formik";
import { addPet } from "../petsSlice";
import { ageList, categoryList, countryList, petTypeList, sexList } from "../petsList/data";
import s from "./createPet.module.css"


export default function CreatePet() {
  return (<div>

  </div>
  )
}
