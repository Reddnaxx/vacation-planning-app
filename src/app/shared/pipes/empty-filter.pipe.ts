import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "emptyFilter",
  standalone: true,
})
export class EmptyFilterPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
