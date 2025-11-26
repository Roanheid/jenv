import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ListItem } from '../../services/data.interace';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatListModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private readonly dataService = inject(DataService);

  items = signal<ListItem[]>([]);

  listForm = new FormGroup({
    find: new FormControl(''),
    input: new FormControl('', Validators.required),
  });

  constructor() {
    this.dataService.getListItems().subscribe((items: ListItem[]) => {
      this.items.set(items);
    });
  }

  onSubmit(): void {
    if (!this.listForm.valid) {
      return;
    }

    const value = this.listForm.get('input')?.value ?? '';
    const name = value.replace(/\s+/g, '-').toLowerCase();

    this.items.update((values: ListItem[]) => {
      return [
        ...values,
        {
          name,
          value,
        },
      ];
    });
  }
}
