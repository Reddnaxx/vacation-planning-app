import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform<T extends { [key: string]: any }>(
    items: T[] | null,
    field: string,
    searchText: string | null,
  ): T[] {
    if (!items) return [];
    if (!searchText) return items;

    return items.filter(item =>
      item[field]?.toLowerCase().includes(searchText.toLowerCase()),
    );
  }
}
