import { about } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { Button, Photo } from './ui';

export default function About() {
  return (
    <section id="sobre" data-theme="dark" className="bg-ink" aria-labelledby="sobre-title">
      <div className="about-panel min-h-[min(112svh,64rem)] pb-[clamp(2rem,4vw,3.5rem)] max-[899px]:pb-0">
        <div className="frame relative z-[1] grid-12 gap-y-12 pt-[clamp(4rem,7vw,6.5rem)]">
          <div className="col-span-12 min-[900px]:col-span-6">
            <h2 id="sobre-title" className="t-head max-w-[13ch]" data-split>
              Mais de 30 anos de oftalmologia
            </h2>
            {/* a legenda termina na linha de base do número, sem descer até o retrato */}
            <p className="mt-8 flex items-end gap-4 text-gold-light" data-reveal>
              <span className="text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[0.8] tracking-[-0.05em]">1994</span>
              <span className="max-w-[18ch] text-body leading-snug">formada pela EMESCAM, em Vitória</span>
            </p>
          </div>

          <div
            className="col-span-12 flex flex-col gap-10 min-[900px]:col-span-5 min-[900px]:col-start-8 min-[900px]:pt-3"
            data-reveal
          >
            <div data-reveal-item>
              <h3 className="text-lead font-medium text-gold-light">Formação</h3>
              <p className="mt-3 max-w-[38ch]">{about.education}</p>
            </div>
            <div data-reveal-item>
              <h3 className="text-lead font-medium text-gold-light">Atuação</h3>
              <p className="mt-3 max-w-[38ch]">{about.practice}</p>
            </div>
            <div data-reveal-item>
              <h3 className="text-lead font-medium text-gold-light">Atendimento</h3>
              <p className="mt-3 max-w-[38ch]">{about.care}</p>
              <ul className="mt-5 flex flex-col gap-2">
                {about.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 flex-none rounded-full bg-gold" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal-item>
              <Button href={whatsappUrl()} variant="gold" magnetic>
                Agendar consulta
              </Button>
            </div>
          </div>
        </div>

        <div className="about-portrait" data-shutter>
          <Photo
            name="sylvia-perfil"
            widths={[600, 900]}
            sizes="(max-width: 899px) 86vw, 38vw"
            alt="Retrato da Dra. Sylvia Passamani"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </section>
  );
}
