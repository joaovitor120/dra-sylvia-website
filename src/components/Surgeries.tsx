'use client';

import { useRef } from 'react';
import { surgeries, surgeryNote, type Surgery } from '@/data/site';
import { MOTION_OK, gsap, useScene } from '@/lib/gsap';
import { whatsappUrl } from '@/lib/whatsapp';
import { Button } from './ui';

/** O que aparece dentro de cada lente: letras da tabela de leitura ou um texto de perto. */
function LensContent({ kind }: { kind: Surgery['kind'] }) {
  if (kind === 'near') {
    return <span className="lens__text">Mensagens no celular, a bula do remédio, o cardápio do restaurante.</span>;
  }
  const lines = { far: ['E', 'F P', 'T O Z'], astig: ['H N', 'D C O', 'Z V'], cataract: ['Z H', 'O V C', 'N D'] }[kind];
  return (
    <span className="lens__chart">
      {lines.map((l) => (
        <span key={l}>{l}</span>
      ))}
    </span>
  );
}

/**
 * As cirurgias, contadas a partir do incômodo de quem chega ao consultório.
 * Cada lente mostra a visão como ela é antes da correção e fica nítida conforme
 * a rolagem passa por ela (ou ao apontar), como a cirurgia faz.
 */
export default function Surgeries() {
  const root = useRef<HTMLElement>(null);

  useScene(root, (mm) => {
    mm.add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>('.lens', root.current).forEach((lens) => {
        gsap.fromTo(
          lens,
          { '--c': 0 },
          {
            '--c': 1,
            ease: 'none',
            scrollTrigger: { trigger: lens, start: 'top 80%', end: 'center 45%', scrub: true },
          },
        );
      });
    });
  });

  return (
    <section ref={root} id="cirurgias" className="bg-ivory-2 py-section" aria-labelledby="cirurgias-title">
      <div className="frame">
        <div className="grid-12 gap-y-8">
          <h2 id="cirurgias-title" className="t-head col-span-12 max-w-[14ch] lg:col-span-7" data-split>
            Você está cansado de usar óculos?
          </h2>
          <p className="col-span-12 max-w-[40ch] text-lead lg:col-span-5 lg:self-end" data-reveal>
            São mais de 30 anos de oftalmologia. Miopia, hipermetropia, astigmatismo e catarata podem ser tratados com
            cirurgia, e o primeiro passo é uma consulta para avaliar o seu caso.
          </p>
        </div>

        <ul className="mt-[clamp(4rem,8vw,7rem)] flex flex-col gap-[clamp(4rem,8vw,7rem)]">
          {surgeries.map((s) => (
            <li key={s.id} className="surgery">
              <div className="surgery__lens">
                <div className="lens-ring">
                  <figure className={`lens lens--${s.kind}`} aria-hidden="true">
                    <LensContent kind={s.kind} />
                    <span className="lens__haze" />
                  </figure>
                </div>
              </div>
              <div className="surgery__body" data-reveal>
                <h3 className="surgery__name" data-reveal-item>
                  {s.name}
                </h3>
                <p className="mt-6 max-w-[34ch] text-lead font-medium" data-reveal-item>
                  {s.symptom}
                </p>
                <p className="mt-4 max-w-[44ch]" data-reveal-item>
                  {s.treatment}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div
          className="mt-[clamp(4rem,8vw,7rem)] flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          data-reveal
        >
          <p className="max-w-[52ch] text-ink-soft" data-reveal-item>
            {surgeryNote}
          </p>
          <div data-reveal-item>
            <Button
              href={whatsappUrl(
                'Oi, quero agendar uma consulta com a Dra. Sylvia para avaliar meu caso (miopia, hipermetropia, astigmatismo ou catarata).',
              )}
              variant="ink"
              magnetic
            >
              Agendar consulta
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
