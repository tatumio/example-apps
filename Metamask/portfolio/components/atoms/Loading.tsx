import * as React from "react";

import { clsxm } from "@/lib/utils";

const Loading = React.forwardRef<
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
          "inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]",
          className
        )}
        role="status"
        {...rest}
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  }
);

export default Loading;
