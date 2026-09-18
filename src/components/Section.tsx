import type { ReactNode } from 'react';

/** Consistent section shell: id anchor, padding, max width. */
export default function Section({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-28 md:py-36 ${className}`}
    >
      {children}
    </section>
  );
}
