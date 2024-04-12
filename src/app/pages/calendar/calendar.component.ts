import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CalendarMainComponent } from "./children/calendar-main/calendar-main.component";
import { CalendarHeaderComponent } from "./children/calendar-header/calendar-header.component";
import { MONTH_DAYS } from "./children/calendar-main/data/monthDays";
import { log } from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [CalendarMainComponent, CalendarHeaderComponent],
  templateUrl: "./calendar.component.html",
  styleUrl: "./calendar.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  public monthOffset: number = 0;
  public yearOffset: number = 0;

  protected currentYear: number;
  protected currentMonth: number;
  protected currentDay: number;
  protected startDayOfWeek: number;

  protected changeMonth(offset: number) {
    this.monthOffset += offset;

    if (offset < 0 && this.monthWithOffset < 0) {
      this.yearOffset--;
      this.monthOffset = 11 - this.currentMonth;
    }

    if (offset > 0 && this.monthWithOffset > 11) {
      this.yearOffset++;
      this.monthOffset = -this.currentMonth;
    }
  }

  private get days() {
    return MONTH_DAYS(this.yearWithOffset);
  }

  protected get monthWithOffset() {
    return this.currentMonth + this.monthOffset;
  }

  protected get yearWithOffset() {
    return this.currentYear + this.yearOffset;
  }

  private get startDayWithOffset() {
    const date = new Date();
    date.setMonth(this.monthWithOffset);
    date.setFullYear(this.yearWithOffset);
    date.setDate(1);
    const day = date.getDay();
    return day === 0 ? 7 : day;
  }

  protected get beforeDays() {
    let month = this.monthWithOffset - 1;
    month = month < 0 ? 11 : month;
    return this.days[month].filter(
      value => value > this.days[month].length - this.startDayWithOffset + 1,
    );  
  }

  protected get currentMonthDays() {
    return this.days[this.monthWithOffset % 12];
  }

  protected get fillDays() {
    return this.days[(this.monthWithOffset + 1) % 12].filter(
      value =>
        value < 42 - this.beforeDays.length - this.currentMonthDays.length + 1,
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
