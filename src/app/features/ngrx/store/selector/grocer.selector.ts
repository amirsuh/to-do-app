import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Grocery } from "../../models/grocery.model";

// two ways to create slector
export const selectGroceries = (state:{gorcery:Grocery[]}) =>state.gorcery
//export const selectGroceriesByFeature = createFeatureSelector<Grocery[]>("gorcery")


export const selectByGroceryTpye =(type:string)=> createSelector(selectGroceries,(state)=>{
  console.log("select by type called")
  return state.filter(item=>item.type===type)
})
