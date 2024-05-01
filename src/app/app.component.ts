import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HeaderComponent } from "./shared/components/header/header.component";
import { IconService } from "./shared/services/icon.service";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, RouterModule],
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
