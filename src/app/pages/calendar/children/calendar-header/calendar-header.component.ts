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

@Component({
  selector: "app-calendar-header",
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
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
}
