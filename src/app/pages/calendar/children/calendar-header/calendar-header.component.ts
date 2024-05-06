import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MONTHS_NAMES } from "./data/months";
import HistoryModel from "../../../profile/children/models/history.model";
import { CalendarButtonComponent } from "../../../../shared/components/calendar-button/calendar-button.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: "app-calendar-header",
  standalone: true,
  imports: [MatIconButton, MatIcon, MatButton, CalendarButtonComponent],
  templateUrl: "./calendar-header.component.html",
  styleUrl: "./calendar-header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarHeaderComponent {
  @Input({ required: true })
  public currentMonth!: number;
  @Input({ required: true })
  public currentYear!: number;
  @Output()
  public changeMonthEvent: EventEmitter<number> = new EventEmitter();
  protected get monthName() {
    return MONTHS_NAMES[this.currentMonth];
  }
  protected changeMonth(offset: -1 | 1) {
    this.changeMonthEvent.emit(offset);
  }
  public history!: HistoryModel;
  constructor(private dialog: MatDialog) {}

  openEditDialog() {
    const dialogRef = this.dialog.open(CalendarButtonComponent, {
      data: { history },
      backdropClass: "blur-backdrop",
    });
  }
}
