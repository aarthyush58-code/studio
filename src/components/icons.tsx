export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 5.8A2.2 2.2 0 0 1 5.2 3h13.6A2.2 2.2 0 0 1 21 5.2v0A2.2 2.2 0 0 1 18.8 8H5.2A2.2 2.2 0 0 1 3 5.8v0Z" />
      <path d="M3 12.2A2.2 2.2 0 0 1 5.2 10h13.6a2.2 2.2 0 0 1 2.2 2.2v0a2.2 2.2 0 0 1-2.2 2.2H5.2A2.2 2.2 0 0 1 3 12.2v0Z" />
      <path d="M3 18.2A2.2 2.2 0 0 1 5.2 16h13.6a2.2 2.2 0 0 1 2.2 2.2v0A2.2 2.2 0 0 1 18.8 21H5.2A2.2 2.2 0 0 1 3 18.2v0Z" />
    </svg>
  );
}
