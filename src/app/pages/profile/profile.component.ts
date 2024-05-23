import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { MaterialModule } from "@shared/modules/material/material.module";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ProfileUserSectionComponent } from "./children/profile-user-section/profile-user-section.component";
import { ProfileHistorySectionComponent } from "./children/profile-history-section/profile-history-section.component";
import { HistoryInfoCardComponent } from "./children/history-info-card/history-info-card.component";
import HistoryModel from "./models/history.model";
import { BreadCrumbComponent } from "@shared/components/bread-crumb/bread-crumb.component";
import { BreadCrumbService } from "@shared/services/bread-crumb.service";
import { ProfileManagerSectionComponent } from "@pages/profile/children/profile-manager-section/profile-manager-section.component";
import { AuthService } from "@pages/auth/services/auth-service/auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import UserModel from "@shared/models/user.model";
import { LoaderComponent } from "@shared/components/loader/loader.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    MaterialModule,
    NgOptimizedImage,
    CommonModule,
    ProfileUserSectionComponent,
    ProfileHistorySectionComponent,
    HistoryInfoCardComponent,
    BreadCrumbComponent,
    ProfileManagerSectionComponent,
    LoaderComponent,
    MatSlideToggleModule,
  ],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements AfterViewInit {
  protected user$: Observable<UserModel>;
  protected history!: HistoryModel[];

  protected isManagerSectionActive: boolean = false;

  @ViewChild("toggle", { read: ElementRef })
  private toggleGroup?: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private breadcrumbService: BreadCrumbService,
  ) {
    this.history = [];
    this.user$ = this.authService.user$;
    this.breadcrumbService.loadBreadCrumbs();
  }

  public ngAfterViewInit(): void {
    if (this.toggleGroup?.nativeElement) {
      this.toggleGroup.nativeElement.value = "history";
    }
  }
}
