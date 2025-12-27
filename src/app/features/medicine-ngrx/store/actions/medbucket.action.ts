import { createAction, props } from "@ngrx/store";
import { MedBucket } from "../../model/medbucket.model";
import { MedGrocery } from "../../model/medgrocery.model";

export const addToMedBucket = createAction('[MedBucket] MedAdd ',props<{payload:MedBucket}>())
export const removeToMedBucket = createAction('[MedBucket] MedRemove ',props<{payload:Partial<MedBucket>}>())
