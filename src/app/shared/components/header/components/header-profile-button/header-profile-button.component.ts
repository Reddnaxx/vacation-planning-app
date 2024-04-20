import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-header-profile-button",
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatBadgeModule,
    MatButtonModule,
    NgOptimizedImage,
    MatIcon,
  ],
  templateUrl: "./header-profile-button.component.html",
  styleUrl: "./header-profile-button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderProfileButtonComponent {}
