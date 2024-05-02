import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { EmployeesModule } from "../../../../modules/employees.module";

@Component({
  selector: "app-employee-department-info-card",
  standalone: true,
  imports: [EmployeesModule],
  templateUrl: "./employee-department-info-card.component.html",
  styleUrl: "./employee-department-info-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDepartmentInfoCardComponent {
  @Input({ required: true })
  public cardTitle!: string;
}
