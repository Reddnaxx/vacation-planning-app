import { Component, Input } from "@angular/core";
import { MaterialModule } from "../../../../shared/modules/material/material.module";
import { CommonModule } from "@angular/common";
import { provideNativeDateAdapter } from "@angular/material/core";
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
  @Input({ required: true })
  public currentDay!: number;

  @Input({ required: true })
  public beforeDays!: number[];

  @Input({ required: true })
  public currentMonthDays!: number[];

  @Input({ required: true })
  public fillDays!: number[];

  @Input({ required: true })
  public offset!: number;
}
