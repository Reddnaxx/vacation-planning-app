import { Component, OnDestroy, OnInit } from "@angular/core";
import { MaterialModule } from "../../shared/modules/material/material.module";
import { NgIf, NgOptimizedImage } from "@angular/common";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { ProfileUserSectionComponent } from "./children/profile-user-section/profile-user-section.component";
import { ProfileHistorySectionComponent } from "./children/profile-history-section/profile-history-section.component";
import { HistoryInfoCardComponent } from "./children/history-info-card/history-info-card.component";
import HistoryModel from "./children/models/history.model";
import { BreadCrumbComponent } from "@shared/components/bread-crumb/bread-crumb.component";
import { BreadCrumbService } from "@shared/services/bread-crumb.service";
import { AuthService } from "@pages/auth/services/auth-service/auth.service";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    MaterialModule,
    NgOptimizedImage,
    ButtonComponent,
    NgIf,
    ProfileUserSectionComponent,
    ProfileHistorySectionComponent,
    HistoryInfoCardComponent,
    BreadCrumbComponent,
  ],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  profileUser: any; // тип поменять
  public history!: HistoryModel[]

  constructor(private auth: AngularFireAuth, private authService: AuthService, private router: Router, private breadcrumbService: BreadCrumbService) {

    this.history = []
    this.breadcrumbService.loadBreadCrumbs();
  }

  ngOnInit(): void {
    this.subscription = this.auth.authState.subscribe((user) => {
      if (user) {
        this.profileUser = user
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}