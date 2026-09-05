import type { SVGProps } from 'react';

/**
 * The Hoodie LB wordmark logo.
 * Renders as inline SVG so it inherits `currentColor`.
 */
export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 32"
      fill="currentColor"
      aria-label="The Hoodie LB"
      role="img"
      {...props}
    >
      <text
        x="0"
        y="24"
        fontFamily="inherit"
        fontSize="22"
        fontWeight="700"
        letterSpacing="0.05em"
      >
        THE HOODIE LB
      </text>
    </svg>
  );
}
