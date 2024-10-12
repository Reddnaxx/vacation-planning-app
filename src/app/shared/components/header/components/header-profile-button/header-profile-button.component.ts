import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  signal,
} from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { MaterialModule } from "@shared/modules/material/material.module";
import { MatBadgeModule } from "@angular/material/badge";
import { AuthService } from "@pages/auth/services/auth-service/auth.service";
import { HistoryService } from "@shared/services/history.service";
import { GlobalEventService } from "@shared/services/global-event.service";
import { Observable } from "rxjs";

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
export class HeaderProfileButtonComponent {
  protected newRequestsCount = signal<number>(0);
  protected isManager$?: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private globalEventService: GlobalEventService,
    private historyService: HistoryService,
    private destroyRef: DestroyRef,
  ) {
    this.historyService
      .getHistoryByStatus("Ожидание")
      .subscribe(value => this.newRequestsCount.update(() => value.length));
    this.isManager$ = this.authService.isManager$;
  }

  protected async logout() {
    await this.authService.logout();
  }
}
