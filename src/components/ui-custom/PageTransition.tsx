import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function PageTransition({ children }: Props) {
  return (
    <div className="page-enter animate-fade-in">
      {children}
    </div>
  );
}
