import { Component, computed, inject, OnInit } from '@angular/core';
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
import { ListItem } from '../../services/data/data.interface';
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
export class ListComponent implements OnInit {
  private readonly dataService = inject(DataService);

  items = computed<ListItem[]>(() => {
    return this.dataService.items().filter((item: ListItem) => {
      // if searching for an item return only items that have a match
      if (this.highlightedText().length > 0) {
        return item.value
          .toLowerCase()
          .includes(this.highlightedText().toLowerCase());
      } else {
        return item;
      }
    });
  });
  highlightedText = computed<string>(() => this.dataService.highlightedText());

  listForm = new FormGroup({
    input: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  ngOnInit(): void {
    // load initial list of items, this updates the dataservice items signal,
    // which triggers the computed items signal above.
    this.dataService.getListItems();
  }

  onSubmit(): void {
    if (!this.listForm.valid) {
      return;
    }

    // get value from input
    const value = this.listForm.get('input')?.value ?? '';

    // update name to kebab-case
    const name = value.replaceAll(/\s+/g, '-').toLowerCase();

    // add new listitem to items, which updates the computed items signal above.
    this.dataService.addListItem({
      name,
      value,
    });

    this.listForm.reset();
  }
}
