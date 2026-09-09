import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  variant?: "light" | "colored" | "transparentLight" | "cancel";
  className?: string;
  children?: React.ReactNode;
}

function CustomButton({
  title,
  variant = "colored",
  className,
  children,
  ...props
}: CustomButtonProps) {
  const buttonVariants = {
    light: {
      "primary-span":
        "transition-transform absolute inset-0 duration-300  translate-y-6 group-hover:translate-0 text-ink group-hover:bg-brand  ",
      "secondary-span":
        "text-ink relative z-10 tracking-wide p-5 group-hover:text-white",
    },
    colored: {
      "primary-span":
        "transition-transform absolute inset-0 duration-300  -translate-y-6 group-hover:translate-0 text-ink group-hover:bg-white  ",
      "secondary-span": "relative z-10 p-5 group-hover:text-brand text-white",
    },
    transparentLight: {
      "primary-span":
        "transition-transform absolute inset-0 duration-300  translate-y-6 group-hover:translate-0 text-ink group-hover:bg-white/20 ",
      "secondary-span":
        "relative z-10 tracking-wide p-5 group-hover:text-white",
    },
    cancel: {
      "primary-span":
        "transition-transform absolute inset-0 duration-300  translate-y-6 group-hover:translate-0 text-ink group-hover:bg-red-500  ",
      "secondary-span":
        "text-ink relative z-10 tracking-wide p-5 group-hover:text-white",
    },
  };

  return (
    <Button
      {...props}
      variant="outline"
      className={
        cn(
          "relative h-10 group overflow-hidden  cursor-pointer  rounded-full px-0   text-sm font-semibold",
        ) +
        " " +
        className
      }
    >
      <span className={buttonVariants[variant]["primary-span"]}></span>
      <span className={buttonVariants[variant]["secondary-span"]}>
        {" "}
        {title}{" "}
      </span>
      {children}
    </Button>
  );
}

export default CustomButton;
