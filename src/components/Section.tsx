import type { ReactNode } from 'react';

/** Consistent section shell: id anchor, padding, max width.
 *  `scrim` adds a soft radial darkening behind the content for readability
 *  over the galaxy — fades out toward the edges so the background still shows. */
export default function Section({
  id,
  children,
  className = '',
  scrim = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  scrim?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-28 md:py-36 ${className}`}
    >
      {scrim && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,rgba(8,6,15,0.85),rgba(8,6,15,0.55)_55%,transparent_88%)]"
        />
      )}
      {children}
    </section>
  );
}
