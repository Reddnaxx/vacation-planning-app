import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IProfileEditForm } from "@pages/profile/models/profile-edit-form.interface";
import { ProfileEditModel } from "@pages/profile/models/profile-edit.model";

export class ProfileUserEditFormViewModel {
  public form: FormGroup<IProfileEditForm> = new FormGroup<IProfileEditForm>({
    email: new FormControl<string>("", [Validators.email, Validators.required]),
    phone: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(18),
    ]),
  });

  public get emailControl() {
    return this.form.controls.email;
  }

  public get phoneControl() {
    return this.form.controls.phone;
  }

  public toModel(): ProfileEditModel {
    const result = new ProfileEditModel();
    result.email = this.form.controls.email.value ?? "";
    result.phone = this.form.controls.phone.value ?? "";
    return result;
  }

  public fromModel(model: ProfileEditModel): void {
    this.form.controls.email.setValue(model.email);
    this.form.controls.phone.setValue(model.phone);
  }
}
