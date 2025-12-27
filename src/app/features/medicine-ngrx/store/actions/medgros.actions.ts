import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { MedGrocery } from "../../model/medgrocery.model";

export const medGroceryAction = createActionGroup({
  source:'Med Grocery API',
  events:{
    'Load medGroceris':emptyProps(),
    'Load medGroceries Success':props<{payload:MedGrocery[]}>(),
    'Load medGroceries Failure':emptyProps()
  }
})
