import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MaterialModule } from "@shared/modules/material/material.module";
import { CommonModule } from "@angular/common";
import { provideNativeDateAdapter } from "@angular/material/core";
import { CalendarCellComponent } from "../../components/calendar-cell/calendar-cell.component";
import HistoryModel from "@pages/profile/models/history.model";

@Component({
  selector: "app-calendar-main",
  standalone: true,
  imports: [MaterialModule, CommonModule, CalendarCellComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./calendar-main.component.html",
  styleUrl: "./calendar-main.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarMainComponent {
  @Input({ required: true })
  public currentDay!: number;

  @Input({ required: true })
  public monthStartDay!: number;

  @Input({ required: true })
  public beforeDays!: number[];

  @Input({ required: true })
  public currentMonthDays!: number[];

  @Input({ required: true })
  public fillDays!: number[];

  @Input({ required: true })
  public monthOffset!: number;

  @Input({ required: true })
  public yearOffset!: number;

  @Input({ required: true })
  public set $vacations(vacations: HistoryModel[]) {
    this.vacations = vacations.map(vacation => ({
      start: new Date(vacation.dateStart),
      end: new Date(vacation.dateEnd),
      type: vacation.type,
    }));
  }

  protected vacations: { start: Date; end: Date; type: string }[] = [];

  protected isVacationDay(day: number, monthOffset: number): boolean {
    const date = new Date();
    date.setMonth(date.getMonth() + monthOffset);
    date.setDate(day);
    return this.vacations.some(vacation => {
      const end = new Date(vacation.end);
      end.setDate(end.getDate() + 1);
      return date >= vacation.start && date <= end;
    });
  }

  protected getVacationType(day: number, monthOffset: number): string {
    const date = new Date();
    date.setMonth(date.getMonth() + monthOffset);
    date.setDate(day);
    return (
      this.vacations.find(vacation => {
        const end = new Date(vacation.end);
        end.setDate(end.getDate() + 1);
        return date >= vacation.start && date <= end;
      })?.type ?? ""
    );
  }
}
