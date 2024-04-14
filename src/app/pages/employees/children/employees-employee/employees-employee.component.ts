import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MaterialModule } from "../../../../shared/modules/material/material.module";
import { EmployeeModel } from "../../models/employee.model";
import { EmployeesService } from "../../services/employees.service";
import { EmployeeInfoCardComponent } from './components/employee-info-card/employee-info-card.component';

@Component({
  selector: "app-employees-employee",
  standalone: true,
  imports: [MatCardModule, MaterialModule, EmployeeInfoCardComponent],
  templateUrl: "./employees-employee.component.html",
  styleUrl: "./employees-employee.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesEmployeeComponent {
  @Input({ required: true })
  public employee!: EmployeeModel;

  constructor(private employeesService: EmployeesService) {}

  public remove() {
    this.employeesService.delete(this.employee.id);
  }
}
