import { reasons } from '@/data/site';

/** A frase de abertura do capítulo. Com movimento, ela aparece dentro da pupila do hero. */
export function Statement({ className = '', reveal = true }: { className?: string; reveal?: boolean }) {
  return (
    <p className={`statement ${className}`} {...(reveal ? { 'data-reveal': '' } : {})}>
      Muitos problemas de visão evoluem em silêncio. O acompanhamento regular identifica alterações antes que tragam
      impacto.
    </p>
  );
}

/**
 * Dentro da pupila: a página entra no escuro e as linhas ganham nitidez com a
 * rolagem, como as linhas de uma tabela de leitura, da maior para a menor.
 */
export default function Prevention() {
  return (
    <section id="prevencao" data-theme="dark" className="bg-pupil pb-section text-ivory" aria-labelledby="prevencao-title">
      <div className="frame prevention__frame pt-[clamp(6rem,10vw,9rem)]">
        <Statement className="prevention__statement" />

        <h2
          id="prevencao-title"
          className="prevention__title t-head mt-[clamp(5rem,9vw,8rem)] max-w-[15ch] text-gold-light"
          data-split
        >
          Por que cuidar da visão regularmente?
        </h2>

        <ol className="mt-[clamp(3.5rem,7vw,6rem)] flex flex-col gap-[clamp(3rem,6vw,5.5rem)]">
          {reasons.map((r) => (
            <li key={r.title} className="chart__row">
              <h3 className="chart__title" data-focus>
                {r.title}
              </h3>
              <p className="chart__text text-ivory/85">{r.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
