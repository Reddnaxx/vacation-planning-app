import { Component } from "@angular/core";
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: "app-calendar-header",
  standalone: true,
  imports: [MatIconButton, MatIcon, MatButton],
  templateUrl: "./calendar-header.component.html",
  styleUrl: "./calendar-header.component.scss",
})
export class CalendarHeaderComponent {}
