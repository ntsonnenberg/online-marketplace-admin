import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  className?: string;
}

export default function Input({ className, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className={`outline outline-1 outline-red-400 rounded-md p-2 focus:outline-none focus:outline-red-500 ${className}`}
    />
  );
}
