import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { BreadCrumbService } from "@shared/services/bread-crumb.service";

@Component({
  selector: "app-bread-crumb",
  standalone: true,
  imports: [CommonModule, RouterModule, MatIcon],
  templateUrl: "./bread-crumb.component.html",
  styleUrl: "./bread-crumb.component.scss",
})
export class BreadCrumbComponent {

  constructor(protected breadcrumbService: BreadCrumbService) {}
}
