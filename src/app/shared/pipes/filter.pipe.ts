import { Pipe, PipeTransform } from "@angular/core";
import slug from "slug";

@Pipe({
  name: "filter",
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform<T extends { [key: string]: any }>(
    items: T[] | null,
    fields: string[],
    searchText: string | null,
  ): T[] {
    if (!items) return [];
    if (!searchText || searchText?.length === 0) return items;

    return items.filter(item => {
      return fields
        .map(field => {
          if (!(field in item)) return;
          return slug(item[field], { trim: true }).includes(
            slug(searchText, { trim: true }),
          );
        })
        .some(value => value);
    });
  }
}
