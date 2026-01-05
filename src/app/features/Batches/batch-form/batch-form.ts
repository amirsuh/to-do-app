import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { BatchModel } from '../../../core/model/class/user.model';
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";
import { MatSelect, MatOption } from "@angular/material/select";
import { CommonModule } from '@angular/common';
import { MatDatepickerToggle, MatDatepicker } from "@angular/material/datepicker";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-batch-form',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule,MatDialogContent, MatFormField, MatLabel, MatError, MatSelect, MatOption, MatDialogActions, ReactiveFormsModule, CommonModule, MatDatepickerToggle, MatDatepicker],
  templateUrl: './batch-form.html',
  styleUrl: './batch-form.scss',
})
export class BatchForm {
  isEdit: boolean;
  form: any;
// If data exists, it's edit; otherwise add
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BatchForm>,
    @Inject(MAT_DIALOG_DATA) public data: BatchModel | null
  ) {
    this.isEdit = !!this.data;
     this.form = this.fb.group({
    id: [this.data?.batchId ?? null],
    batchName: [this.data?.batchName ?? '', [Validators.required, Validators.minLength(3)]],
    startDate: [this.data?.startDate ?? '', Validators.required],
    endDate: [this.data?.endDate ?? '', Validators.required],
    isActive: [this.data?.isActive ?? true]
  });
  }






  save(): void {
    if (this.form.invalid) return;
    const value = this.form.value;
    // Coerce to string ISO for consistency (Date pickers may return strings)
    const payload = {
      ...value,
      startDate: value.startDate as string,
      endDate: value.endDate as string
    };
    this.dialogRef.close(payload);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

}
