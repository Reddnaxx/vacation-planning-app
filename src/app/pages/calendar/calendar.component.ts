import { Component } from "@angular/core";
import { CalendarMainComponent } from "./children/calendar-main/calendar-main.component";

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [CalendarMainComponent],
  templateUrl: "./calendar.component.html",
  styleUrl: "./calendar.component.scss",
})
export class CalendarComponent {}
