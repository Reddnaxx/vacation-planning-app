import { FormControl } from "@angular/forms";

export interface IProfileEditForm {
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
}
