'use client';

import { useRef } from 'react';
import { MOTION_OK, gsap, useScene } from '@/lib/gsap';
import { whatsappUrl } from '@/lib/whatsapp';
import { Button } from './ui';

/** O fecho: a íris volta, se abre com a rolagem, e o monograma fica no centro dela. */
export default function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useScene(root, (mm) => {
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        '.cta-iris',
        { scale: 0.45, rotate: -30 },
        {
          scale: 1,
          rotate: 0,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'center center', scrub: true },
        },
      );
      gsap.fromTo(
        '.cta-iris__pupil',
        { scale: 1.6 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'center center', scrub: true },
        },
      );
    });
  });

  return (
    <section
      ref={root}
      id="agendar"
      data-theme="dark"
      className="relative overflow-hidden bg-ink py-section text-ivory"
      aria-labelledby="agendar-title"
    >
      <div
        className="cta-iris right-[-12vw] top-1/2 aspect-square w-[min(46vw,44rem)] -translate-y-1/2 max-[899px]:relative max-[899px]:right-auto max-[899px]:top-auto max-[899px]:mx-auto max-[899px]:mb-14 max-[899px]:w-[82vw] max-[899px]:translate-y-0"
        aria-hidden="true"
      >
        <div className="cta-iris__pupil">
          <span className="cta-iris__mark" />
        </div>
      </div>

      <div className="frame relative">
        <h2 id="agendar-title" className="t-display max-w-[11ch]" data-split>
          Agende sua consulta
        </h2>
        <p className="mt-8 max-w-[34ch] text-lead" data-reveal>
          Fale com o atendimento da clínica pelo WhatsApp e veja os horários disponíveis para cuidar da sua saúde
          ocular.
        </p>
        <div className="mt-10" data-reveal>
          <Button href={whatsappUrl()} variant="gold" magnetic>
            Agendar pelo WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
