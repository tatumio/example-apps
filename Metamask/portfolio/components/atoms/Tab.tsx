import React from "react";

import { clsxm } from "@/lib/utils";

const Tab = ({
  text,
  onClick,
  active,
  className,
}: {
  text: string;
  onClick: () => void;
  active?: boolean;
  className?: string;
}): JSX.Element => (
  <button
    className={clsxm(
      "py-2 px-4 rounded-lg mx-1 w-[110px] hover:bg-gray-900",
      active ? "bg-gray-900 text-white" : "bg-gray-600 text-gray-200",
      className
    )}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Tab;
