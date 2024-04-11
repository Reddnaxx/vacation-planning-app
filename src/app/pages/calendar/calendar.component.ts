import { Component } from "@angular/core";
import { CalendarMainComponent } from "./children/calendar-main/calendar-main.component";
import { CalendarHeaderComponent } from './children/calendar-header/calendar-header.component';

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [CalendarMainComponent, CalendarHeaderComponent],
  templateUrl: "./calendar.component.html",
  styleUrl: "./calendar.component.scss",
})
export class CalendarComponent {}
