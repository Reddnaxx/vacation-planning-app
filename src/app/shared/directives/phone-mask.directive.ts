import { AfterViewInit, Directive, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[formControl][phoneMask]",
  standalone: true,
})
export class PhoneMaskDirective implements AfterViewInit {
  constructor(public ngControl: NgControl) {}

  public ngAfterViewInit(): void {
    if (!this.ngControl.value) {
      this.ngControl.valueAccessor?.writeValue("+7 ");
    } else {
      this.onInputChange(this.ngControl.value, false);
    }
  }

  @HostListener("ngModelChange", ["$event"])
  onModelChange(event: string) {
    this.onInputChange(event, false);
  }

  @HostListener("keydown.backspace", ["$event"])
  keydownBackspace(event: KeyboardEvent) {
    const target = <HTMLInputElement>event.target;
    this.onInputChange(target?.value, true);
  }

  onInputChange(event: string, backspace: boolean) {
    let newVal = event.replace(/\D/g, "");

    if (backspace && newVal.length === 4) {
      newVal = newVal.substring(0, newVal.length - 1);
    }

    if (newVal.length === 0) {
      newVal = "+7 ";
    } else if (newVal.length <= 2) {
      newVal = newVal.replace(/^7?(\d?)/, "+7 ($1");
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^7(\d{0,3})/, "+7 ($1");
    } else if (newVal.length <= 4) {
      newVal = newVal.replace(/^7(\d{0,3})/, "+7 ($1)");
    } else if (newVal.length <= 7) {
      newVal = newVal.replace(/^7(\d{0,3})(\d{0,3})/, "+7 ($1) $2");
    } else if (newVal.length <= 9) {
      newVal = newVal.replace(/^7(\d{0,3})(\d{0,3})(\d{0,2})/, "+7 ($1) $2-$3");
    } else if (newVal.length <= 11) {
      newVal = newVal.replace(
        /^7(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/,
        "+7 ($1) $2-$3-$4",
      );
    } else {
      newVal = newVal.substring(0, 11);
      newVal = newVal.replace(
        /^7(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/,
        "+7 ($1) $2-$3-$4",
      );
    }
    this.ngControl.valueAccessor?.writeValue(newVal);
  }
}
