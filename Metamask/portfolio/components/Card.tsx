import * as React from "react";

import { clsxm } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithRef<"div">
>(
  (
    { children, className, ...rest }: React.ComponentPropsWithRef<"div">,
    _ref
  ): JSX.Element => {
    return (
      <div
        className={clsxm(
          "flex flex-col items-center justify-center space-y-10",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default Card;
