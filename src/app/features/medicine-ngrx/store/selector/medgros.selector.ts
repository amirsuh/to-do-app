import { createSelector, State } from "@ngrx/store";
import { MedGrocery } from "../../model/medgrocery.model";

export const selectMedGroceris = (state:{medGrocery:MedGrocery[]})=> state.medGrocery

export const selectGroceryByType =(type:string)=> createSelector(selectMedGroceris,(State)=>{
  return State.filter(item=>item.category ===type)
})
