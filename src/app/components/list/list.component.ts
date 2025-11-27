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
import { RouterModule } from '@angular/router';
import { HighlightTextPipe } from '../../pipes/highlight-text.pipe';
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
    HighlightTextPipe,
    RouterModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private readonly dataService = inject(DataService);

  items = signal<ListItem[]>([]);
  highlightedText = signal<string>('');

  listForm = new FormGroup({
    find: new FormControl(''),
    input: new FormControl('', Validators.required),
  });

  constructor() {
    this.dataService.getListItems().subscribe((items: ListItem[]) => {
      this.items.set(items);
    });

    this.listForm.get('find')?.valueChanges.subscribe((change) => {
      this.highlightedText.set(change ?? '');
    });
  }

  onSubmit(): void {
    if (!this.listForm.valid) {
      return;
    }

    // get value
    const value = this.listForm.get('input')?.value ?? '';

    // update name to kebab -case
    const name = value.replace(/\s+/g, '-').toLowerCase();

    // add new listitem to items array
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
