import * as React from "react";

function DocumentUploadIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.75 12.75v-4.5l-1.5 1.5M6.75 8.25l1.5 1.5"
        stroke="#035F5B"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 7.5v3.75c0 3.75-1.5 5.25-5.25 5.25h-4.5C3 16.5 1.5 15 1.5 11.25v-4.5C1.5 3 3 1.5 6.75 1.5h3.75"
        stroke="#035F5B"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 7.5h-3c-2.25 0-3-.75-3-3v-3l6 6z"
        stroke="#035F5B"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default DocumentUploadIcon;
