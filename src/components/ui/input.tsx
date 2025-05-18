import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
}

function Input({ className, type, ref, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "h-10 px-3 py-2 text-base leading-5 font-light rounded-sm border border-[#CFD8E1] text-[#3B4752] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#CFD8E1] font-[sans]",
        className
      )}
      ref={ref}
      {...props}
    />
  );
}

Input.displayName = "Input";

export { Input };
