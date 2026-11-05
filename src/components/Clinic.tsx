'use client';

import { useRef, useState } from 'react';
import { clinicPhotos } from '@/data/site';
import { MOTION_OK, ScrollTrigger, gsap, useScene } from '@/lib/gsap';
import { Photo } from './ui';

/**
 * O consultório visto por uma lente só: a seção fica presa e cada foto se abre
 * em círculo sobre a anterior, como a pupila se ajustando a um novo ponto.
 * Sem movimento, as três fotos aparecem lado a lado com as legendas.
 */
export default function Clinic() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useScene(root, (mm) => {
    // a cena presa só no desktop; no celular as fotos ficam num carrossel (ver globals.css)
    mm.add(`${MOTION_OK} and (min-width: 900px)`, () => {
      const el = root.current!;
      el.classList.add('scene-on');
      const figures = gsap.utils.toArray<HTMLElement>('.clinic-figure', el);
      const stage = el.querySelector<HTMLElement>('.clinic-stage')!;
      const lens = el.querySelector<HTMLElement>('.clinic-grid')!;

      gsap.set(figures.slice(1), { clipPath: 'circle(0% at 50% 50%)' });
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          // a seção já envolve o palco: o GSAP usa ela como espaçador, sem mover nada no HTML
          pinSpacer: el,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          // a legenda troca quando a foto nova já cobre mais da metade da lente
          onUpdate: (self) => {
            const time = self.progress * tl.duration();
            setActive(opened.filter((t) => time >= t).length);
          },
        },
      });
      const opened: number[] = [];
      tl.fromTo(lens, { scale: 0.82, rotate: -8 }, { scale: 1, rotate: 0, duration: 1 }, 0);
      figures.slice(1).forEach((fig, i) => {
        const at = 0.8 + i * 1.1;
        opened.push(at + 0.45);
        tl.to(fig, { clipPath: 'circle(71% at 50% 50%)', duration: 0.8, ease: 'power2.inOut' }, at);
        tl.from(fig.querySelector('img'), { scale: 1.25, duration: 0.9, ease: 'power2.out' }, at);
      });
      tl.to({}, { duration: 0.4 });
      ScrollTrigger.sort();

      return () => {
        el.classList.remove('scene-on');
        setActive(0);
      };
    });
  });

  return (
    <section ref={root} id="consultorio" className="clinic bg-ivory-2" aria-labelledby="consultorio-title">
      <div className="clinic-stage">
        <div className="frame grid-12 gap-y-10 py-section [.scene-on_&]:py-0">
          <div className="col-span-12 min-[900px]:col-span-5">
            <h2 id="consultorio-title" className="t-head max-w-[11ch]" data-split>
              Conheça o consultório
            </h2>
            <p className="mt-6 max-w-[36ch]" data-reveal>
              Uma estrutura preparada para oferecer cuidado, conforto e precisão em cada atendimento, no Ed. Lea, Centro
              de Vitória.
            </p>
            <ol className="clinic-captions mt-10 hidden flex-col gap-3 text-lead text-ink-soft [.scene-on_&]:flex" aria-hidden="true">
              {clinicPhotos.map((p, i) => (
                <li key={p.src} className={`flex items-center gap-4 ${i === active ? 'is-active' : ''}`}>
                  <span className="cap-dot" />
                  {p.caption}
                </li>
              ))}
            </ol>
          </div>

          <div className="col-span-12 min-[900px]:col-span-7">
            <div className="clinic-grid">
              <span className="clinic-ring" aria-hidden="true" />
              {clinicPhotos.map((p, i) => (
                <figure key={p.src} className="clinic-figure">
                  <Photo
                    name={p.src}
                    widths={[800, 1440]}
                    sizes="(max-width: 899px) 78vw, 44vw"
                    alt={p.alt}
                    width={1448}
                    height={1086}
                    priority={false}
                    className={i === 2 ? 'object-[50%_50%]' : 'object-[60%_50%]'}
                  />
                  <figcaption className="mt-4 text-center font-medium">{p.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
