import { Component } from "@angular/core";
import { CalendarMainComponent } from "./children/calendar-main/calendar-main.component";
import { CalendarHeaderComponent } from "./children/calendar-header/calendar-header.component";
import { MONTH_DAYS } from "./children/calendar-main/data/monthDays";

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [CalendarMainComponent, CalendarHeaderComponent],
  templateUrl: "./calendar.component.html",
  styleUrl: "./calendar.component.scss",
})
export class CalendarComponent {
  public monthOffset: number = 0;

  protected changeMonth(offset: number) {
    this.monthOffset += offset;

    if (this.monthWithOffset > 11) this.monthOffset--;
    if (this.monthWithOffset < 0) this.monthOffset++;
  }

  protected currentYear: number;
  protected currentMonth: number;
  protected currentDay: number;
  protected startDayOfWeek: number;

  private get days() {
    return MONTH_DAYS(this.currentYear);
  }

  protected get monthWithOffset() {
    return this.currentMonth + this.monthOffset;
  }

  private get startDayWithOffset() {
    const date = new Date();
    date.setMonth(this.monthWithOffset);
    date.setDate(1);
    return date.getDay() + 1;
  }

  protected get beforeDays() {
    let month = (this.monthWithOffset - 1) % 12;
    month = month < 0 ? 11 : month;
    return this.days[month].filter(
      value => value > this.days[month].length - this.startDayWithOffset + 2,
    );
  }

  protected get currentMonthDays() {
    return this.days[this.monthWithOffset % 12];
  }

  protected get fillDays() {
    return this.days[(this.monthWithOffset + 1) % 12].filter(
      value =>
        value < 35 - this.beforeDays.length - this.currentMonthDays.length + 1,
    );
  }

  constructor() {
    const date = new Date();

    this.currentMonth = date.getMonth();
    this.currentDay = date.getDate();
    this.currentYear = date.getFullYear();

    date.setDate(1);
    this.startDayOfWeek = date.getDay() + 1;
  }
}
