import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrl: './add-entry.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgFor,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    NgIf
  ]
})
export class AddEntryComponent {
  entryTypes = ['Doctor', 'Patient', 'Trial'];
  selectedType = 'Doctor';
  
  newEntry = {
    name: '',
    specialization: '', // for doctors
    condition: '', // for patients
    description: '' // for trials
  };

  onSubmit() {
    console.log('New entry:', { type: this.selectedType, ...this.newEntry });
    // Reset form
    this.newEntry = {
      name: '',
      specialization: '',
      condition: '',
      description: ''
    };
  }
}
