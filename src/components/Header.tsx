'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import { whatsappUrl } from '@/lib/whatsapp';
import { Button } from './ui';

// na barra, só o que cabe antes da íris do primeiro quadro; o menu leva todas as seções
const links = [
  { href: '#procedimentos', label: 'Procedimentos' },
  { href: '#cirurgias', label: 'Cirurgias' },
  { href: '#sobre', label: 'A médica' },
  { href: '#horarios', label: 'Horários' },
];
const menuLinks = [
  ...links.slice(0, 3),
  { href: '#consultorio', label: 'Consultório' },
  links[3],
  { href: '#localizacao', label: 'Como chegar' },
  { href: '#duvidas', label: 'Dúvidas' },
];

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // esconde ao descer, volta ao subir; fundo sólido depois da abertura;
  // tinta clara sobre as seções escuras (data-theme="dark")
  useEffect(() => {
    const header = ref.current!;
    const triggers: ScrollTrigger[] = [];
    triggers.push(
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll();
          header.classList.toggle('is-solid', y > 40);
          header.classList.toggle('is-hidden', self.direction === 1 && y > 400);
        },
      }),
    );
    document.querySelectorAll<HTMLElement>('[data-theme="dark"]').forEach((section) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top 40px',
          end: 'bottom 40px',
          onToggle: (self) => header.classList.toggle('is-dark', self.isActive),
        }),
      );
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  // menu de tela cheia: ESC fecha, o foco fica preso dentro e volta ao botão
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current!;
    const focusables = panel.querySelectorAll<HTMLElement>('a, button');
    focusables[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    document.addEventListener('keydown', onKey);
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      lenis?.start();
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header ref={ref} className="site-header">
        <div className="frame flex h-[5.25rem] items-center gap-3 sm:gap-6">
          {/* a marca completa ocupa 90% da altura da barra */}
          <a href="#inicio" className="brand" aria-label="Dra. Sylvia Passamani, oftalmologista. Ir para o início">
            <span className="brand__logo" aria-hidden="true" />
          </a>
          {/* à esquerda, para não cruzar a íris do primeiro quadro */}
          <nav aria-label="Principal" className="ml-4 mr-auto hidden items-center gap-7 min-[1440px]:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-11 flex-none items-center rounded-full bg-gold px-5 text-[0.95rem] font-semibold text-ink transition-transform duration-150 active:scale-95 sm:inline-flex"
            >
              Agendar<span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="grid h-11 w-11 flex-none place-items-center rounded-full bg-gold text-ink transition-transform duration-150 active:scale-95"
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" className="flex flex-col gap-[5px]">
                <span className="block h-[2px] w-4 rounded bg-current" />
                <span className="block h-[2px] w-4 rounded bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        ref={panelRef}
        id="menu"
        className={`menu-panel ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
      >
        <div className="frame flex h-full flex-col justify-between pb-10 pt-24">
          <button
            type="button"
            className="absolute right-[var(--gutter)] top-4 grid h-11 w-11 place-items-center rounded-full bg-gold text-ink"
            aria-label="Fechar menu"
            onClick={() => {
              setOpen(false);
              toggleRef.current?.focus();
            }}
            tabIndex={open ? 0 : -1}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <nav aria-label="Menu" className="flex flex-col items-center gap-2 text-center">
            {menuLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className="menu-item font-medium tracking-[-0.04em]"
                style={{ transitionDelay: open ? `${180 + i * 60}ms` : '0ms' }}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
              >
                <span className="menu-item__dot" aria-hidden="true" />
                <span className="menu-item__roll">
                  <span>{l.label}</span>
                  <span aria-hidden="true">{l.label}</span>
                </span>
              </a>
            ))}
          </nav>
          <div className={`flex justify-center transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}>
            <Button href={whatsappUrl()} variant="gold">
              Agendar pelo WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
