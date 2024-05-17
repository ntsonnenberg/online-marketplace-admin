import classNames from "classnames";
import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  className?: string;
}

export default function Input({ className, ...rest }: InputProps) {
  const inputClasses = classNames(
    "bg-transparent outline outline-1 outline-primary placeholder-primary-variant rounded-md p-2",
    className
  );

  return <input {...rest} className={inputClasses} />;
}
