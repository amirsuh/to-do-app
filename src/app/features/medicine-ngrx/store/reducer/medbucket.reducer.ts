import { createReducer, on } from '@ngrx/store';
import { MedBucket } from '../../model/medbucket.model';
import { addToMedBucket, removeToMedBucket } from '../actions/medbucket.action';
import { removeFromBucket } from '../../../ngrx/store/actions/bucket.action';

const initialMedBucket: MedBucket[] = [];
export const medBuckerReducer = createReducer(
  initialMedBucket,
  on(addToMedBucket, (state, action) => {
    const existItem = state.find((item) => item.id === action.payload.id);
    if (existItem) {
      return state.map((item) => {
        return item.id === action.payload.id
          ? { ...item, quantity: item.quantity + action.payload.quantity }
          : item;
      });
    } else return [...state, action.payload];
  }),
  on(removeToMedBucket, (state, action) => {
    const existItem = state.find((item) => item.id === action.payload.id);
    if (existItem  && existItem.quantity>1) {
      // debugger
      console.log(state,action)
      return state.map((item) => {
        return item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item;
      });
    } else {
      console.log(state,action)
      return state.filter((item) => item.id !== action.payload.id);
    }
  })
);
