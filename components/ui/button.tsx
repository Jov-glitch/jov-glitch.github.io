import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 px-4 py-2 font-mono font-bold uppercase tracking-wider transition-all duration-200 border-2 border-brutal-black bg-brutal-white text-brutal-black hover:shadow-brutal-hover active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brutal-black",
  {
    variants: {
      variant: {
        default:
          "bg-brutal-white border-brutal-black text-brutal-black hover:bg-brutal-dark hover:text-brutal-white",
        destructive:
          "bg-brutal-red border-brutal-red text-brutal-white hover:bg-brutal-red hover:shadow-brutal-hover",
        outline:
          "bg-transparent border-brutal-black text-brutal-black hover:bg-brutal-black hover:text-brutal-white",
        ghost:
          "border-0 bg-transparent text-brutal-black hover:bg-brutal-light hover:shadow-none",
        secondary:
          "bg-brutal-dark border-brutal-black text-brutal-white hover:bg-brutal-black hover:shadow-brutal-hover",
        reverse:
          "bg-brutal-white border-brutal-white text-brutal-black hover:bg-brutal-red hover:text-brutal-white hover:border-brutal-red",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };

