import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { TCellStyle } from "../../types/cell-style.type";

@Component({
  selector: "app-calendar-cell",
  standalone: true,
  imports: [CommonModule, MatCardModule],
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
