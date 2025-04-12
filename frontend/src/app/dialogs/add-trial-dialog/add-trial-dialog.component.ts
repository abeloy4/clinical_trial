import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-trial-dialog',
  templateUrl: './add-trial-dialog.component.html',
  styleUrls: [],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AddTrialDialogComponent {
  trial = {
    name: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  };
  

  constructor(private dialogRef: MatDialogRef<AddTrialDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.trial.name && this.trial.description) {
      this.dialogRef.close(this.trial);
      this.trial = { name: '', description: '', startDate: '', endDate: '' };
    }
  }
  
}
