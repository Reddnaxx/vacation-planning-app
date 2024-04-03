import { Component, Input } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "../../modules/material/material.module";
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: "app-header",
  standalone: true,
  imports: [HttpClientModule, MaterialModule, MatToolbar],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  @Input({ required: true })
  public title!: string;
}
