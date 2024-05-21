import { FormControl } from "@angular/forms";

export interface IEmployeesAddDialogForm {
  firstName: FormControl<string | null>;
  surname: FormControl<string | null>;
  lastName: FormControl<string | null>;
  phone: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
