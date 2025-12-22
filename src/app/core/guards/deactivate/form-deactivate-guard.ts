// form-deactivate.guard.ts
import { CanDeactivateFn } from '@angular/router';
import { Forms } from '../../../features/forms/forms';

export const canDeactivateForm: CanDeactivateFn<Forms> = (component) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
