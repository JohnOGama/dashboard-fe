import { format, parseISO } from "date-fns";

export function dateFormatter(dateString: any) {
  const parsedDate = parseISO(dateString);
  return format(parsedDate, "MMMM d, yyyy");
}
