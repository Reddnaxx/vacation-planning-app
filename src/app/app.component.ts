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
import { GlobalEventService } from "@shared/services/global-event.service";
import { MatSnackBar } from "@angular/material/snack-bar";

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
    private eventService: GlobalEventService,
    private snackBar: MatSnackBar,
    private globalEventService: GlobalEventService,
  ) {
    this.iconService.registerIcons();
  }

  public ngOnInit(): void {
    this.loggerService.log("App initialized");
    this.eventService.on("notification").subscribe(value => {
      this.snackBar.open(value.content, "", {
        duration: 3000,
        horizontalPosition: "left",
        verticalPosition: "top",
        panelClass: "app-snack-bar-info",
      });
    });
  }
}
