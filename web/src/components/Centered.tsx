import { ReactNode } from "react";

interface CenteredProps {
  children: ReactNode;
}

export function Centered({ children }: CenteredProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {children}
    </div>
  );
}
