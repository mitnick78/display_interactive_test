import { cn } from "@/utils/cn";
import { formatTitle } from "@/utils/string";

interface LabelProps {
  title: string;
}

const variants: Record<string, string> = {
  mme: 'bg-pink-100 text-pink-700',
  m:   'bg-blue-100 text-blue-700',
}


export const  Label = ({ title }: LabelProps)  => {
  console.log(variants)
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        variants[title] ?? 'bg-gray-100 text-gray-700'
      )}
    >
      {formatTitle(title)}
    </span>
  )
}