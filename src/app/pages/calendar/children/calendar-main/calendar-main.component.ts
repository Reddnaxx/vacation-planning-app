import { AfterViewInit, Component, OnInit } from "@angular/core";
import { MaterialModule } from "../../../../shared/modules/material/material.module";
import { CommonModule } from "@angular/common";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MONTH_DAYS } from "./data/monthDays";
import { CalendarCellComponent } from "../../components/calendar-cell/calendar-cell.component";

@Component({
  selector: "app-calendar-main",
  standalone: true,
  imports: [MaterialModule, CommonModule, CalendarCellComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./calendar-main.component.html",
  styleUrl: "./calendar-main.component.scss",
})
export class CalendarMainComponent {
  protected currentYear: number;
  protected currentMonth: number;
  protected currentDay: number;
  protected startDayOfWeek: number;

  private get days() {
    return MONTH_DAYS(this.currentYear);
  }

  protected get beforeDays() {
    let month = (this.currentMonth - 1) % 12;
    month = month < 0 ? 11 : month;
    return this.days[month].filter(
      value => value > this.days[month].length - this.startDayOfWeek + 2,
    );
  }

  protected get currentMonthDays() {
    return this.days[this.currentMonth];
  }

  protected get fillDays() {
    return this.days[(this.currentMonth + 1) % 12].filter(
      value =>
        value < 35 - this.beforeDays.length - this.currentMonthDays.length + 1,
    );
  }

  constructor() {
    const date = new Date();
    this.currentMonth = date.getMonth();
    this.currentDay = date.getDate();
    this.currentYear = date.getFullYear();

    const today = date;
    today.setDate(1);
    this.startDayOfWeek = today.getDay() + 1;
  }
}
