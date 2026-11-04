'use client';

import { useRef, useState } from 'react';
import { address, route, site } from '@/data/site';
import { MOTION_OK, gsap, useScene } from '@/lib/gsap';
import { TextLink } from './ui';

/**
 * Como chegar: o caminho da rua até a sala, na ordem em que o paciente faz.
 * A barra se enche conforme a rolagem; o mapa só carrega se a pessoa pedir.
 */
export default function Location() {
  const root = useRef<HTMLElement>(null);
  const [map, setMap] = useState(false);

  useScene(root, (mm) => {
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        '.route__fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.route', start: 'top 70%', end: 'bottom 55%', scrub: true },
        },
      );
      gsap.from('.room-number', {
        yPercent: 40,
        opacity: 0,
        duration: 1.2,
        scrollTrigger: { trigger: '.room-disc', start: 'top 80%', once: true },
      });
    });
  });

  return (
    <section ref={root} id="localizacao" className="bg-ivory py-section" aria-labelledby="localizacao-title">
      <div className="frame grid-12 items-center gap-y-14">
        <div className="col-span-12 lg:col-span-6">
          <h2 id="localizacao-title" className="t-head" data-split>
            Como chegar
          </h2>
          <p className="mt-6 max-w-[38ch] text-lead" data-reveal>
            {address.street}, {address.district}. {address.landmark}.
          </p>

          <div className="route mt-12" data-reveal>
            <span className="route__bar" aria-hidden="true">
              <span className="route__fill" />
            </span>
            <ol>
            {route.map((step) => (
              <li key={step.title} className="route__step" data-reveal-item>
                <span className="route__dot" aria-hidden="true" />
                <div>
                  <h3 className="text-[1.25rem] font-semibold tracking-[-0.015em]">{step.title}</h3>
                  <p className="mt-1 text-ink-soft">{step.text}</p>
                </div>
              </li>
            ))}
            </ol>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <TextLink href={site.mapsUrl}>Abrir no Google Maps</TextLink>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <div className="room-disc mx-auto w-full max-w-[36rem]" data-shutter>
            {map ? (
              <iframe
                src={site.mapsEmbed}
                title="Mapa: Rua Graciano Neves, 73, Centro, Vitória/ES"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="flex flex-col items-center px-8">
                <span className="room-number block text-[clamp(6rem,15vw,13rem)] font-medium leading-[0.9] tracking-[-0.06em]">
                  505
                </span>
                <span className="text-lead font-medium">sala, no 5º andar</span>
                <button
                  type="button"
                  onClick={() => setMap(true)}
                  className="mt-6 inline-flex h-12 items-center rounded-full bg-ink px-6 font-semibold text-ivory transition-transform duration-150 hover:scale-[1.03] active:scale-95"
                >
                  Mostrar o mapa aqui
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
