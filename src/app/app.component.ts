import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HeaderComponent } from "./shared/components/header/header.component";
import { IconService } from "./shared/services/icon.service";
import { RouterModule, RouterOutlet } from "@angular/router";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MatButton } from "@angular/material/button";
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, RouterModule, MatButton],
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
