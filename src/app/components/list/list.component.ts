import { Component, computed, inject } from '@angular/core';
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
import { ListItem } from '../../services/data/data.interace';
import { DataService } from '../../services/data/data.service';
import { SearchComponent } from '../search/search.component';

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
    SearchComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private readonly dataService = inject(DataService);

  items = computed<ListItem[]>(() => this.dataService.items());
  highlightedText = computed<string>(() => this.dataService.highlightedText());

  listForm = new FormGroup({
    input: new FormControl('', Validators.required),
  });

  constructor() {
    this.dataService.getListItems();
  }

  onSubmit(): void {
    if (!this.listForm.valid) {
      return;
    }

    // get value from input
    const value = this.listForm.get('input')?.value ?? '';

    // update name to kebab-case
    const name = value.replace(/\s+/g, '-').toLowerCase();

    // add new listitem to items array
    this.dataService.addListItem({
      name,
      value,
    });

    this.listForm.reset();
  }
}
