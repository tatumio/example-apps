import * as React from "react";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithRef<"button">
>(
  (
    { children, ...rest }: React.ComponentPropsWithRef<"button">,
    ref
  ): JSX.Element => {
    return (
      <button
        ref={ref}
        className="font-mono text-center text-white bg-black min-w-[150px] border border-black rounded-md border p-3 transition-colors hover:bg-white hover:text-black"
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Button;
