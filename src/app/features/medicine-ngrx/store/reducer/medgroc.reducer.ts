import { createReducer, on } from "@ngrx/store";
import { MedGrocery } from "../../model/medgrocery.model";
import { medGroceryAction } from "../actions/medgros.actions";

// const initialMedStorage:MedGrocery[] = [    {
//       "id":1,
//       "medicineId": 201,
//       "brandName": "Paracetamol",
//       "genericName": "Acetaminophen",
//       "category": "Pain Relief",
//       "dosageMg": 500,
//       "manufacturer": "ABC Pharma",
//       "price": 25,
//       "requiresPrescription": false
//     },
//     {
//        "id":2,
//       "medicineId": 202,
//       "brandName": "Amoxicillin",
//       "genericName": "Amoxicillin",
//       "category": "Antibiotic",
//       "dosageMg": 250,
//       "manufacturer": "HealthCare Labs",
//       "price": 80,
//       "requiresPrescription": true
//     },
//     {
//        "id":3,
//       "medicineId": 203,
//       "brandName": "Cetirizine",
//       "genericName": "Cetirizine",
//       "category": "Allergy",
//       "dosageMg": 10,
//       "manufacturer": "Wellness Pharma",
//       "price": 15,
//       "requiresPrescription": false
//     },
//     {
//        "id":4,
//       "medicineId": 204,
//       "brandName": "Omeprazole",
//       "genericName": "Omeprazole",
//       "category": "Gastric",
//       "dosageMg": 20,
//       "manufacturer": "CureLife",
//       "price": 60,
//       "requiresPrescription": true
//     }
//   ]
const initialMedStorage:MedGrocery[] = []
export const  medgrosReducer = createReducer(initialMedStorage,on(medGroceryAction.loadMedGroceriesSuccess,(State,action)=>{
  return action.payload
}),
on(medGroceryAction.loadMedGroceriesFailure,(state,action)=>{
  return []
}))
