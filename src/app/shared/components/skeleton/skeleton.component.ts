import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-skeleton",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./skeleton.component.html",
  styleUrl: "./skeleton.component.scss",
})
export class SkeletonComponent {
  @Input()
  public width?: string;

  @Input()
  public height?: string;

  @Input()
  public borderRadius?: string;

  @Input()
  public dark?: boolean;
}
