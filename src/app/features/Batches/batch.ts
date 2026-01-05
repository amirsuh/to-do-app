import { Injectable, signal } from '@angular/core';
import { BatchModel } from './models/batch';

const STORAGE_KEY = 'batches';

@Injectable({ providedIn: 'root' })
export class BatchService {
  // Signal-based state for reactive updates
  private readonly _batches = signal<BatchModel[]>(this.load());
  batches = this._batches.asReadonly();

  private load(): BatchModel[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as BatchModel[] : [];
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._batches()));
  }

  getAll(): BatchModel[] {
    return this._batches();
  }

  add(batch: Omit<BatchModel, 'id'>): void {
    const id = this.nextId();
    const newBatch: BatchModel = { id, ...batch };
    this._batches.update(list => [newBatch, ...list]);
    this.persist();
  }

  update(batch: BatchModel): void {
    this._batches.update(list =>
      list.map(b => (b.id === batch.id ? { ...batch } : b))
    );
    this.persist();
  }

  delete(id: number): void {
    this._batches.update(list => list.filter(b => b.id !== id));
    this.persist();
  }

  private nextId(): number {
    const list = this._batches();
    return list.length ? Math.max(...list.map(b => b.id)) + 1 : 1;
  }
}
