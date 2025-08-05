import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Select = forwardRef(({ 
  children, 
  className, 
  error,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2 text-base border rounded-lg bg-white focus-ring transition-colors duration-200 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path fill-rule=\"evenodd\" d=\"M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z\" clip-rule=\"evenodd\" /></svg>')] bg-no-repeat bg-right bg-[length:1.5em_1.5em] pr-8";
  const errorStyles = error ? "border-error focus:border-error" : "border-gray-200 focus:border-primary";

  return (
    <select
      ref={ref}
      className={cn(
        baseStyles,
        errorStyles,
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export default Select;