import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store"
import { Grocery } from "../../models/grocery.model"

// export const initGroceries = createAction('[Grocery] Load Goceries')
// export const completedGroceries = createAction('[Grocery] Load Goceries Success')


export const groceryAction = createActionGroup({
  source:'Grocery API',
  events:{
    'Load groceris':emptyProps(),
    'Load groceries Success':props<{payload:Grocery[]}>(),
    'Load groceries Failure':emptyProps()
  }
})
