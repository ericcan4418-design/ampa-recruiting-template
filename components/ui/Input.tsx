import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[#0D1A2D]">
            {label}{props.required && <span className="ml-1 text-red-500" aria-hidden>*</span>}
          </label>
        )}
        <input
          ref={ref} id={inputId}
          className={cn("h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-[#0D1A2D] placeholder:text-[#9B8A75] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C]",
            error ? "border-red-400" : "border-[#0D1A2D]/20 hover:border-[#0D1A2D]/40", className)}
          aria-invalid={!!error} {...props}
        />
        {error && <p className="text-xs text-red-600"><span aria-hidden>⚠</span> {error}</p>}
        {hint && !error && <p className="text-xs text-[#9B8A75]">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
