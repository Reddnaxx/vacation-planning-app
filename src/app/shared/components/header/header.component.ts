import { ChangeDetectionStrategy, Component, Input, NgZone, OnInit } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "../../modules/material/material.module";
import { MatToolbar } from "@angular/material/toolbar";
import { NgIf, NgOptimizedImage } from "@angular/common";
import { MatBadgeModule } from "@angular/material/badge";
import { HeaderProfileButtonComponent } from './components/header-profile-button/header-profile-button.component';
import { BreadCrumbComponent } from '@shared/components/bread-crumb/bread-crumb.component';
import { Subscription } from 'rxjs';
import { AuthService } from '@pages/auth/services/auth-service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

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
    NgIf
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  userIsAuthenticated: boolean = false;

  constructor(private authService: AuthService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.authService.getIsAuthenticated().subscribe((isAuthenticated) => {
      this.ngZone.run(() => {
        this.userIsAuthenticated = isAuthenticated;
      });
    });
  }

  logout(): void {
    this.authService.logout();
  }
}