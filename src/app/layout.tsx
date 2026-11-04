import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import { site } from '@/data/site';
import './globals.css';

// a mesma família geométrica das letras douradas da recepção
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: [
    'oftalmologista Vitória',
    'consulta oftalmológica Vitória',
    'Dra Sylvia Passamani',
    'exame de vista Vitória',
    'glaucoma Vitória',
    'lentes de contato Vitória',
  ],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: '/images/sylvia-retrato-1280.webp', width: 1280, height: 1707, alt: 'Dra. Sylvia Passamani' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#f2efea',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={montserrat.variable} suppressHydrationWarning>
      <head>
        {/*
          Os estados ocultos da abertura só valem com script. Se a camada de movimento
          não assumir em 3 s, a classe sai e a página aparece inteira.
        */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__motionReady)document.documentElement.classList.remove('js')},3000)",
          }}
        />
        <link
          rel="preload"
          as="image"
          href="/images/sylvia-retrato-960.webp"
          imageSrcSet="/images/sylvia-retrato-640.webp 640w, /images/sylvia-retrato-960.webp 960w, /images/sylvia-retrato-1280.webp 1280w"
          imageSizes="(max-width: 1099px) 80vw, 72svh"
          fetchPriority="high"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
