import * as React from "react";

function BackIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.963 7.412L4.375 15l7.588 7.587M25.625 15H4.587"
        stroke="#2E3C56"
        strokeWidth={3}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default BackIcon;
