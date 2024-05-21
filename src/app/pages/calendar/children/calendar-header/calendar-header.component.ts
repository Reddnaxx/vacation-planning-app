import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MONTHS_NAMES } from "./data/months";
import { MatDialog } from "@angular/material/dialog";
import { HistoryDialogComponent } from "@shared/components/history-dialog/history-dialog.component";

@Component({
  selector: "app-calendar-header",
  standalone: true,
  imports: [MatIconModule, MatButtonModule, HistoryDialogComponent],
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

  constructor(private dialog: MatDialog) {}

  protected openNewRequestDialog() {
    this.dialog.open(HistoryDialogComponent, {
      backdropClass: "blur-backdrop",
    });
  }
}
