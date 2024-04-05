import { FormControl } from "@angular/forms";

export interface IProfileData {
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
}
