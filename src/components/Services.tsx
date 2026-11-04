import { services } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { Photo, TextLink } from './ui';

export default function Services() {
  return (
    <section id="procedimentos" className="bg-ivory py-section" aria-labelledby="procedimentos-title">
      <div className="frame grid-12 gap-y-14">
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 id="procedimentos-title" className="t-head" data-split>
              Procedimentos
            </h2>
            <p className="mt-6 max-w-[34ch] text-ink-soft" data-reveal>
              Escolha o atendimento e fale com a equipe pelo WhatsApp: cada botão já abre a conversa com o assunto
              escrito.
            </p>
            <div className="lens-photo mt-10 hidden w-[min(28vw,26rem)] lg:block" data-shutter>
              <Photo
                name="autorrefrator"
                widths={[800, 1440]}
                sizes="28vw"
                alt="Equipamento de diagnóstico do consultório, diante do painel com a marca da Dra. Sylvia"
                width={1448}
                height={1086}
                className="object-[62%_50%]"
              />
            </div>
          </div>
        </div>

        <ul className="col-span-12 lg:col-span-7" data-reveal>
          {services.map((s) => (
            <li key={s.id} className={`service ${s.urgent ? 'service--urgent' : ''}`} data-reveal-item>
              <span className="service__bullet" aria-hidden="true" />
              <div>
                <h3 className="service__name">{s.name}</h3>
                <p className="mt-3 max-w-[46ch]">{s.text}</p>
                {s.urgent && (
                  <p className="mt-3 max-w-[46ch] font-semibold text-gold-deep">
                    Se o sintoma for intenso ou súbito, não espere a próxima data livre: chame agora.
                  </p>
                )}
                <TextLink href={s.href ?? whatsappUrl(s.message)} className="mt-4">
                  {s.action}
                  {!s.href && (
                    <span className="sr-only"> para {s.name.toLowerCase()} pelo WhatsApp (abre em nova aba)</span>
                  )}
                </TextLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
