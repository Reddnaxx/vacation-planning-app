import { FormControl } from "@angular/forms";

export interface IEmployeesEditDialogForm {
  firstName: FormControl<string | null>;
  surname: FormControl<string | null>;
  lastName: FormControl<string | null>;
  phone: FormControl<string | null>;
}
