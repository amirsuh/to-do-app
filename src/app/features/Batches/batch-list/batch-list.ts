import { Component, computed, signal } from '@angular/core';
import { BatchService } from '../batch';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BatchModel } from '../../../core/model/class/user.model';
import { BatchForm } from '../batch-form/batch-form';
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatCard } from "@angular/material/card";
import { MatHeaderCell, MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-batch-list',
  imports: [MatIcon, MatFormField, MatLabel, MatCard,DatePipe,CommonModule,MatTableModule,],
  templateUrl: './batch-list.html',
  styleUrl: './batch-list.scss',
})
export class BatchList {
// Source data
  readonly batches:any;

  // UI state
  readonly search = signal<string>('');
  readonly pageIndex = signal<number>(0);
  readonly pageSize = signal<number>(5);
    // Derived
  readonly filtered = computed(() => {
    const q = this.search().toLowerCase().trim();
    const items = this.batches();
    if (!q) return items;
    return items.filter((b:any) => b.batchName.toLowerCase().includes(q));
  });

  readonly pageCount = computed(() => Math.ceil(this.filtered().length / this.pageSize()));

  readonly paged = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.filtered().slice(start, start + this.pageSize());
  });

  displayedColumns = ['id', 'batchName', 'startDate', 'endDate', 'isActive', 'actions'];


 constructor(
    private batchService: BatchService,private dialog: MatDialog,
    private snackbar: MatSnackBar

 ){
  this.batches = this.batchService.batches;
 }
 addBatch(): void {
    this.openForm();
  }

  editBatch(batch: BatchModel): void {
    this.openForm(batch);
  }

  deleteBatch(id: number): void {
    this.batchService.delete(id);
    this.snackbar.open('Batch deleted', 'OK', { duration: 2000 });
    this.ensureValidPageAfterChange();
  }

  gotoPage(page: number): void {
    if (page < 0 || page >= this.pageCount()) return;
    this.pageIndex.set(page);
  }

  nextPage(): void {
    this.gotoPage(this.pageIndex() + 1);
  }

  prevPage(): void {
    this.gotoPage(this.pageIndex() - 1);
  }

  private openForm(batch?: BatchModel): void {
    const dialogRef = this.dialog.open(BatchForm, {
      width: '480px',
      data: batch ?? null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return; // canceled
      if (batch) {
        this.batchService.update(result as any);
        this.snackbar.open('Batch updated', 'OK', { duration: 2000 });
      } else {
        this.batchService.add(result as Omit<BatchModel, 'id'>);
        this.snackbar.open('Batch added', 'OK', { duration: 2000 });
      }
      this.ensureValidPageAfterChange();
    });
  }

  private ensureValidPageAfterChange(): void {
    const pages = this.pageCount();
    if (this.pageIndex() >= pages && pages > 0) {
      this.pageIndex.set(pages - 1);
    }
    if (pages === 0) this.pageIndex.set(0);
  }

}
