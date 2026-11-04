'use client';

import { useEffect, useRef } from 'react';
import { whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from './ui';

/** Seções que já têm o próprio contato: ali o botão sai de cena para não cobrir nada. */
const AWAY = ['#duvidas', '#agendar', 'footer'];

/** Botão flutuante do WhatsApp: sempre à mão, no canto, com um pulso discreto. */
export default function WhatsAppFab() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const fab = ref.current;
    const targets = AWAY.map((s) => document.querySelector(s)).filter((el): el is Element => !!el);
    if (!fab || !targets.length) return;
    const visible = new Set<Element>();
    // só conta quando a seção passa pela faixa de baixo da tela, onde o botão fica
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        fab.classList.toggle('is-away', visible.size > 0);
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      className="wa-fab"
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar pelo WhatsApp (abre em nova aba)"
    >
      <span className="wa-fab__ring" aria-hidden="true" />
      <WhatsAppIcon />
    </a>
  );
}
