import { Component, Inject, OnInit } from '@angular/core';
import HistoryModel from '../../../pages/profile/children/models/history.model';
import { MatCardActions } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { IDialogHistoryData } from './interfaces/dialog-history-data.interface';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: "app-dialog-history",
  standalone: true,
  imports: [
    MatCardActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatIcon,
    MatIconButton,
    MatButton,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./dialog-history.component.html",
  styleUrl: "./dialog-history.component.scss",
})
export class DialogHistoryComponent implements OnInit {
  public history!: HistoryModel;
  historyForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDialogHistoryData,
    private dialogRef: MatDialogRef<DialogHistoryComponent>
  ) {
    this.history = this.data.history;
  }

  ngOnInit() {
    this.historyForm = new FormGroup({
      type: new FormControl(this.history.type),
      content: new FormControl(this.history.content),
    });
  }

  saveChanges() {
    this.history.type = this.historyForm.get('type')?.value;
    this.history.content = this.historyForm.get('content')?.value;
    this.dialogRef.close();


  }
}
