import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// References
// https://www.youtube.com/watch?v=re2JFITR7TI
// https://github.com/shadcn-ui/ui/blob/0fae3fd93ae749aca708bdfbbbeddc5d576bfb2e/apps/www/lib/utils.ts#L4
// https://korayguler.medium.com/how-to-merge-react-and-tailwind-css-class-names-f5faeb10ed24
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
