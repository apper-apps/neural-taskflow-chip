import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const Checkbox = forwardRef(({ 
  className, 
  checked = false,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <label className={cn("relative inline-flex items-center cursor-pointer", disabled && "cursor-not-allowed opacity-50", className)}>
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      <motion.div
        className={cn(
          "w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center",
          checked 
            ? "bg-gradient-to-br from-primary to-secondary border-primary shadow-sm" 
            : "bg-white border-gray-300 hover:border-primary/50"
        )}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          >
            <ApperIcon 
              name="Check" 
              size={14} 
              className="text-white font-bold"
            />
          </motion.div>
        )}
      </motion.div>
    </label>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;