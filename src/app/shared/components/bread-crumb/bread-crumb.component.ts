import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IBreadCrumb } from "@shared/components/bread-crumb/interfaces/bread-crumb.interface";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { routes } from "../../../app.routes";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-bread-crumb",
  standalone: true,
  imports: [CommonModule, RouterModule, MatIcon],
  templateUrl: "./bread-crumb.component.html",
  styleUrl: "./bread-crumb.component.scss",
})
export class BreadCrumbComponent {
  protected breadcrumbs: IBreadCrumb[] = [];

  protected get currentRoute() {
    return this.activatedRoute.snapshot.url[
      this.activatedRoute.snapshot.url.length - 1
    ].path;
  }

  constructor(
    protected activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.activatedRoute.url.subscribe(
      value =>
        (this.breadcrumbs = [
          { url: "/", label: "Планировщик отпусков" },
          ...value.map((r, index) => {
            const url = `${index > 0 ? `${value[value.length - 2]}/` : ""}${r.path}`;
            const route = routes.find(route => route.path === url);
            return {
              url: url,
              label:
                route?.title ||
                this.router.getCurrentNavigation()?.extras?.state?.["name"] ||
                "",
            };
          }),
        ]),
    );
  }
}
