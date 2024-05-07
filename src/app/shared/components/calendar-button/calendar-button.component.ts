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
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IcalendarButtonData } from './Interfaces/calendar-button-data';
import {  NativeDateModule } from '@angular/material/core';
import { MatDatepickerToggle, MatDateRangeInput, MatDateRangePicker } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from "@angular/material/core";
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: "app-calendar-button",
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
    NativeDateModule,
    MatDateRangeInput,
    MatDatepickerToggle,
    MatDateRangePicker,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./calendar-button.component.html",
  styleUrls: ["./calendar-button.component.scss"],
})
export class CalendarButtonComponent implements OnInit {
  public history!: HistoryModel;
  historyForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IcalendarButtonData,
    private dialogRef: MatDialogRef<CalendarButtonComponent>,
  ) {
    this.history = this.data.history;
  }

  type: string[] = ["Отгул", "Отпуск", "Придумаю позже", "Придумаю позже"];

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
