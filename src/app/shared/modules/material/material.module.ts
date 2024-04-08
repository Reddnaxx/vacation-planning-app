import { NgModule } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MatButton } from "@angular/material/button";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from "@angular/material/card";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

const MaterialComponents = [
  MatIcon,
  MatButton,
  MatCard,
  MatCardHeader,
  MatCardContent,
  MatCardTitle,
  MatCardSubtitle,
  MatCardImage,
  MatFormField,
  MatInput,
  MatLabel,
  MatError,
];

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}
