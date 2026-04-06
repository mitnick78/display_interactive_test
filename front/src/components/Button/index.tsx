import { cn } from "@/utils/cn"

const variants = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800',
  ghost: 'text-slate-600 hover:text-slate-900',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  leftIcon?: React.ReactNode
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  leftIcon,
  className,
  ...rest 
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors duration-150 cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {leftIcon && leftIcon}
      {children}
    </button>
  )
}

export default Button;