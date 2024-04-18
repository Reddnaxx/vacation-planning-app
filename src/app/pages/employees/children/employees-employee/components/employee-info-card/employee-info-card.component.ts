import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: "app-employee-info-card",
  standalone: true,
  imports: [MatCardModule],
  templateUrl: "./employee-info-card.component.html",
  styleUrl: "./employee-info-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeInfoCardComponent {
  @Input({ required: true })
  public name!: string;

  @Input({ required: true })
  public value!: string;
}
