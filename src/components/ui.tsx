import type { ReactNode } from 'react';

export function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.9 9.9 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.22 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

type ButtonProps = {
  href: string;
  children: string;
  variant?: 'ink' | 'gold' | 'ivory';
  icon?: 'whatsapp' | 'arrow';
  external?: boolean;
  className?: string;
  magnetic?: boolean;
};

/**
 * Botão em cápsula. O círculo da esquerda é a pupila: ao passar o ponteiro ela se
 * dilata e cobre o botão, e o texto troca de linha.
 */
export function Button({
  href,
  children,
  variant = 'ink',
  icon = 'whatsapp',
  external,
  className = '',
  magnetic,
}: ButtonProps) {
  const ext = external ?? href.startsWith('http');
  return (
    <a
      href={href}
      className={`btn ${variant !== 'ink' ? `btn--${variant}` : ''} ${className}`}
      {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(magnetic ? { 'data-magnetic': '' } : {})}
    >
      <span className="btn__dot">{icon === 'whatsapp' ? <WhatsAppIcon /> : <ArrowIcon />}</span>
      <span className="btn__label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {ext && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}

export function TextLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  const ext = href.startsWith('http');
  return (
    <a
      href={href}
      className={`u-link ${className}`}
      {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      <ArrowIcon />
    </a>
  );
}

/** <img> com srcset a partir do nome base gerado por scripts/optimize-images.mjs */
export function Photo({
  name,
  widths,
  sizes,
  alt,
  className = '',
  priority,
  width,
  height,
}: {
  name: string;
  widths: number[];
  sizes: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width: number;
  height: number;
}) {
  const srcSet = widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ');
  return (
    <img
      src={`/images/${name}-${widths[widths.length - 1]}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...(priority ? { fetchPriority: 'high' as const } : {})}
    />
  );
}
