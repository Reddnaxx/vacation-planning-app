import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "../../modules/material/material.module";
import { MatToolbar } from "@angular/material/toolbar";
import { NgOptimizedImage } from "@angular/common";
import { MatBadgeModule } from "@angular/material/badge";
import { HeaderProfileButtonComponent } from './components/header-profile-button/header-profile-button.component';
import { BreadCrumbComponent } from '@shared/components/bread-crumb/bread-crumb.component';

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    HttpClientModule,
    MaterialModule,
    MatToolbar,
    NgOptimizedImage,
    MatBadgeModule,
    HeaderProfileButtonComponent,
    BreadCrumbComponent,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input({ required: true })
  public title!: string;
}
