import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, id, placeholder, options, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-[#0D1A2D]">
            {label}{props.required && <span className="ml-1 text-red-500" aria-hidden>*</span>}
          </label>
        )}
        <div className="relative">
          <select ref={ref} id={selectId}
            className={cn("h-11 w-full appearance-none rounded-lg border bg-white pl-3.5 pr-10 text-sm text-[#0D1A2D] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C]",
              error ? "border-red-400" : "border-[#0D1A2D]/20 hover:border-[#0D1A2D]/40", className)} {...props}>
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9B8A75]" />
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
        {hint && !error && <p className="text-xs text-[#9B8A75]">{hint}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
