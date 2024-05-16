import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IBreadCrumb } from "../models/bread-crumb.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BreadCrumbService {
  public breadcrumbs$: BehaviorSubject<IBreadCrumb[]>;

  constructor(private router: Router) {
    this.breadcrumbs$ = new BehaviorSubject<IBreadCrumb[]>([]);
  }

  public loadBreadCrumbs() {
    this.breadcrumbs$.next([
      {
        label: "Планировщик отпусков",
        url: "",
      },
    ]);
    let currentRoute: ActivatedRoute | null = this.router.routerState.root;
    do {
      const childrenRoutes: ActivatedRoute[] = currentRoute.children;
      currentRoute = null;
      childrenRoutes.forEach(route => {
        if (route.outlet === "primary") {
          if (route.snapshot) {
            if (
              route?.routeConfig?.data?.["breadcrumb"] ||
              route?.routeConfig?.resolve?.["breadcrumb"]
            ) {
              const routeSnapshot = route.snapshot;
              const breadcrumbData: IBreadCrumb | string =
                route.snapshot.data?.["breadcrumb"];
              let result: IBreadCrumb;
              if (!breadcrumbData) {
                result = { url: "", label: "" };
              } else if (typeof breadcrumbData === "string") {
                result = { url: "", label: breadcrumbData };
              } else {
                result = breadcrumbData;
              }
              result.url = routeSnapshot.url[routeSnapshot.url.length - 1].path;
              this.breadcrumbs$.next([...this.breadcrumbs$.value, result]);
            }
          } else {
            this.breadcrumbs$.next([
              ...this.breadcrumbs$.value,
              { label: "", url: route.routeConfig?.path || "" },
            ]);
          }
          currentRoute = route;
        }
      });
    } while (currentRoute);
  }
}
