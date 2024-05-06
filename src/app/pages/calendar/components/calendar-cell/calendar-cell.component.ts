import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardModule } from '@angular/material/card';
import { NgClass, NgIf } from '@angular/common';
import { TCellStyle } from "../../types/cell-style.type";

@Component({
  selector: "app-calendar-cell",
  standalone: true,
  imports: [NgClass, NgIf, MatCardModule],
  templateUrl: "./calendar-cell.component.html",
  styleUrl: "./calendar-cell.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarCellComponent {
  @Input()
  public isToday?: boolean;

  @Input()
  public isDayOff?: boolean;

  @Input({ required: true })
  public day!: number;

  @Input()
  public cellStyle: TCellStyle = "default";
}
