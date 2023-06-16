import * as React from "react";

import { clsxm } from "@/lib/utils";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithRef<"button">
>(
  (
    {
      children,
      disabled,
      className,
      ...rest
    }: React.ComponentPropsWithRef<"button">,
    ref
  ): JSX.Element => {
    return (
      <button
        ref={ref}
        className={clsxm(
          "flex text-md items-center justify-center font-mono text-center min-w-[150px] min-h-[50px] border border-black rounded-md border p-3 transition-colors hover:bg-white hover:text-black",
          disabled ? "bg-white text-black" : "bg-black text-white",
          className
        )}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Button;
