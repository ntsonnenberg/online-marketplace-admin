"use client";

import { ComponentProps } from "react";
import classNames from "classnames";

type ButtonProps = ComponentProps<"button"> & {
  children: any;
  color: string;
  theme: string;
  className?: string;
};

export default function Button({
  children,
  color,
  theme,
  className,
  ...rest
}: ButtonProps) {
  const buttonClasses = classNames(
    "p-2 rounded-md",
    {
      "bg-primary text-on-primary hover:bg-primary-variant":
        color === "primary" && theme === "filled",
      "bg-secondary text-on-secondary hover:bg-secondary-variant":
        color === "secondary" && theme === "filled",
      "bg-transparent outline outline-2 outline-primary text-primary hover:bg-primary hover:text-on-primary":
        color === "primary" && theme === "outline",
      "bg-transparent outline outline-2 outline-secondary text-secondary hover:bg-secondary hover:text-on-secondary":
        color === "secondary" && theme === "outline",
      "bg-transparent text-primary hover:text-primary-variant":
        color === "primary" && theme === "text",
      "bg-transparent text-secondary hover:text-secondary-variant":
        color === "secondary" && theme === "text",
    },
    className
  );

  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
}
