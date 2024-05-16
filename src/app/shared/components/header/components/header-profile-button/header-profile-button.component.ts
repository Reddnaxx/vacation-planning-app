import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "@shared/modules/material/material.module";
import { MatBadgeModule } from "@angular/material/badge";

@Component({
  selector: "app-header-profile-button",
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MatBadgeModule,
    NgOptimizedImage,
  ],
  templateUrl: "./header-profile-button.component.html",
  styleUrl: "./header-profile-button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderProfileButtonComponent {}
