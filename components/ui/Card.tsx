import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  bordered?: boolean;
  padded?: boolean;
}

export function Card({ children, className, hover = false, bordered = true, padded = true }: CardProps) {
  return (
    <div className={cn("bg-white rounded-xl shadow-card", bordered && "border border-slate-200", padded && "p-6", hover && "transition-shadow duration-200 hover:shadow-card-lg cursor-pointer", className)}>
      {children}
    </div>
  );
}
