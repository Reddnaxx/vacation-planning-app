import { Component, Input } from "@angular/core";
import { ButtonComponent } from "./../../shared/components/button/button.component";
import { MaterialModule } from "./../../shared/modules/material/material.module";
import { CommonModule } from "@angular/common";
import { MatCardActions } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: "app-registration",
  standalone: true,
  imports: [CommonModule, MaterialModule, ButtonComponent, MatCardActions, MatSelectModule, MatCheckboxModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

}
