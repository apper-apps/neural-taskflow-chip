import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  className, 
  error,
  rows = 3,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2 text-base border rounded-lg bg-white focus-ring transition-colors duration-200 resize-vertical";
  const errorStyles = error ? "border-error focus:border-error" : "border-gray-200 focus:border-primary";

  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        baseStyles,
        errorStyles,
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;