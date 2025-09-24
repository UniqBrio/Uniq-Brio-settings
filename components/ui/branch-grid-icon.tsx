import React from "react";

// SVG for 3x3 grid icon (as per your reference image)
export const BranchGridIcon = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
  >
    <rect x="3" y="3" width="4" height="4" rx="1" fill="currentColor" />
    <rect x="10" y="3" width="4" height="4" rx="1" fill="currentColor" />
    <rect x="17" y="3" width="4" height="4" rx="1" fill="currentColor" />
    <rect x="3" y="10" width="4" height="4" rx="1" fill="currentColor" />
    <rect x="10" y="10" width="4" height="4" rx="1" fill="currentColor" />
    <rect x="17" y="10" width="4" height="4" rx="1" fill="currentColor" />
    <rect x="3" y="17" width="4" height="4" rx="1" fill="currentColor" />
    <rect x="10" y="17" width="4" height="4" rx="1" fill="currentColor" />
    <rect x="17" y="17" width="4" height="4" rx="1" fill="currentColor" />
  </svg>
);

export default BranchGridIcon;
