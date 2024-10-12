import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  Input,
} from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion";

@Component({
  selector: "app-department-section",
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: "./department-section.component.html",
  styleUrl: "./department-section.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentSectionComponent {
  @Input()
  public name?: string;

  @Input({ transform: booleanAttribute })
  public expanded?: boolean;
}
