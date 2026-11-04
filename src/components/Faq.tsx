import { faq } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { TextLink } from './ui';

/** `<details>`: abre com teclado e funciona sem JavaScript. */
export default function Faq() {
  return (
    <section id="duvidas" className="bg-ivory-2 py-section" aria-labelledby="duvidas-title">
      <div className="frame grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="duvidas-title" className="t-head max-w-[9ch]" data-split>
              Dúvidas frequentes
            </h2>
            <p className="mt-6 max-w-[30ch]" data-reveal>
              Não encontrou a sua dúvida? A equipe responde pelo WhatsApp.
            </p>
            <TextLink href={whatsappUrl('Oi, tenho uma dúvida sobre o atendimento da Dra. Sylvia.')} className="mt-4">
              Perguntar à equipe
            </TextLink>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8" data-reveal>
          {faq.map((item, i) => (
            <details key={item.q} className="faq-item" open={i === 0} data-reveal-item>
              <summary>
                <h3 className="text-[clamp(1.15rem,1rem+0.6vw,1.5rem)] font-medium tracking-[-0.02em]">{item.q}</h3>
                <span className="faq-toggle" aria-hidden="true" />
              </summary>
              <p className="max-w-[56ch] pb-7 pr-14">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
