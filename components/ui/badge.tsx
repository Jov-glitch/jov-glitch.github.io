import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 px-2 py-1 font-mono text-xs font-bold uppercase tracking-wider border border-brutal-black rounded-brutal",
  {
    variants: {
      variant: {
        default: "bg-brutal-white text-brutal-black border-brutal-black",
        secondary:
          "bg-brutal-light text-brutal-black border-brutal-black",
        destructive:
          "bg-brutal-red text-brutal-white border-brutal-red",
        outline: "bg-transparent text-brutal-black border-brutal-black",
        success:
          "bg-brutal-green text-brutal-black border-brutal-green",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

