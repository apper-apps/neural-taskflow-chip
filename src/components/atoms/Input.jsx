import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Input = forwardRef(({ 
  className, 
  type = "text",
  icon,
  iconPosition = "left",
  error,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2 text-base border rounded-lg bg-white focus-ring transition-colors duration-200";
  const errorStyles = error ? "border-error focus:border-error" : "border-gray-200 focus:border-primary";

  if (icon) {
    return (
      <div className="relative">
        {iconPosition === "left" && (
          <ApperIcon 
            name={icon} 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
        )}
        <input
          type={type}
          className={cn(
            baseStyles,
            errorStyles,
            iconPosition === "left" ? "pl-10" : "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {iconPosition === "right" && (
          <ApperIcon 
            name={icon} 
            size={18} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
        )}
      </div>
    );
  }

  return (
    <input
      type={type}
      className={cn(
        baseStyles,
        errorStyles,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;