import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  children: any;
  color: string;
  theme: string;
  className?: string;
}

export default function Button({
  children,
  color,
  theme,
  className,
  ...rest
}: ButtonProps) {
  const typeClasses =
    theme === "filled"
      ? `bg-red-400 outline outline-2 outline-${color}-400 text-white hover:bg-${color}-500`
      : theme === "outline"
      ? `bg-transparent outline outline-2 outline-${color}-400 text-${color}-400 hover:bg-${color}-400 hover:text-white`
      : theme === "text"
      ? `bg-transparent text-${color}-400 hover:text-${color}-500`
      : "";

  return (
    <button className={`p-2 ${typeClasses} rounded-md ${className}`} {...rest}>
      {children}
    </button>
  );
}
