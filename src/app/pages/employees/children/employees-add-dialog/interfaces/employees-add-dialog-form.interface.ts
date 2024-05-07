import { FormControl } from "@angular/forms";

export interface IEmployeesAddDialogForm {
  name: FormControl<string | null>;
  phone: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
