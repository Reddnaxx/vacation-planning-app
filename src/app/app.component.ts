import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { HeaderComponent } from "@shared/components/header/header.component";
import { IconService } from "@shared/services/icon.service";
import { RouterModule, RouterOutlet } from "@angular/router";
import { BreadCrumbComponent } from "@shared/components/bread-crumb/bread-crumb.component";
import { MatCard } from "@angular/material/card";
import { ILoggerService } from "@shared/services/loggers/interfaces/logger-service.interface";
import { LoggerService } from "@shared/services/loggers/logger-factory.service";

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
export class AppComponent implements OnInit {
  public title: string = "ПЛАНИРОВЩИК ОТПУСКОВ";

  constructor(
    private iconService: IconService,
    @Inject(LoggerService) private loggerService: ILoggerService,
  ) {
    this.iconService.registerIcons();
  }

  public ngOnInit(): void {
    this.loggerService.log("Page initialized");
  }
}
