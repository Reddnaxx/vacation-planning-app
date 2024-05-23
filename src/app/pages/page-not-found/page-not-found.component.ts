import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-page-not-found",
  standalone: true,
  imports: [],
  templateUrl: "./page-not-found.component.html",
  styleUrl: "./page-not-found.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
  constructor(private router: Router) {}

  protected async navigateToMainPage() {
    await this.router.navigate([""]);
  }
}
