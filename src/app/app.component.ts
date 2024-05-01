import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HeaderComponent } from "@shared/components/header/header.component";
import { IconService } from "@shared/services/icon.service";
import { RouterModule, RouterOutlet } from "@angular/router";
import { BreadCrumbComponent } from "@shared/components/bread-crumb/bread-crumb.component";
import { MatCard } from "@angular/material/card";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    RouterModule,
    BreadCrumbComponent,
    MatCard,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public title: string = "ПЛАНИРОВЩИК ОТПУСКОВ";

  constructor(private iconService: IconService) {
    this.iconService.registerIcons();
  }
}
