import { Component, Input } from "@angular/core";
import { MatCard, MatCardContent, MatCardHeader } from "@angular/material/card";
import { NgClass } from "@angular/common";
import { TCellStyle } from "../../types/cell-style.type";

@Component({
  selector: "app-calendar-cell",
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardHeader, NgClass],
  templateUrl: "./calendar-cell.component.html",
  styleUrl: "./calendar-cell.component.scss",
})
export class CalendarCellComponent {
  @Input()
  public isToday?: boolean;

  @Input({ required: true })
  public day!: number;

  @Input()
  public cellStyle: TCellStyle = "default";
}
