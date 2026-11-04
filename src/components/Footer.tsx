import { address, schedule, site } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-theme="dark" className="bg-ink pb-28 text-ivory">
      <div className="frame">
        <h2 className="sr-only">Dra. Sylvia Passamani, oftalmologista</h2>
        <div className="footer-wordmark" role="img" aria-label="Sylvia Passamani, Oftalmologista" data-reveal />

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 text-[0.95rem] md:grid-cols-4" data-reveal>
          <div data-reveal-item>
            <h3 className="font-semibold text-gold-light">Endereço</h3>
            <p className="mt-3 leading-relaxed">
              {address.street}
              <br />
              {address.building}
              <br />
              {address.district}
            </p>
          </div>
          <div data-reveal-item>
            <h3 className="font-semibold text-gold-light">Consultas</h3>
            <ul className="mt-3 leading-relaxed">
              {schedule
                .filter((d) => d.slots.length)
                .map((d) => (
                  <li key={d.day}>
                    {d.short}: {d.slots.map((s) => s.label).join(' · ')}
                  </li>
                ))}
            </ul>
          </div>
          <div data-reveal-item>
            <h3 className="font-semibold text-gold-light">Contato</h3>
            <p className="mt-3 leading-relaxed">
              <a className="u-link py-0" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                WhatsApp {site.whatsappDisplay}
              </a>
              <br />
              Unimed e particular
            </p>
          </div>
          <div data-reveal-item>
            <h3 className="font-semibold text-gold-light">Navegar</h3>
            <ul className="mt-3 flex flex-col gap-1">
              <li><a className="u-link py-0" href="#procedimentos">Procedimentos</a></li>
              <li><a className="u-link py-0" href="#cirurgias">Cirurgias</a></li>
              <li><a className="u-link py-0" href="#sobre">A médica</a></li>
              <li><a className="u-link py-0" href="#horarios">Horários</a></li>
              <li><a className="u-link py-0" href="#duvidas">Dúvidas</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 text-small text-ivory/80">
          <p>
            © {year} {site.name} · Oftalmologista
            {site.crm && ` · CRM ${site.crm}`}
            {site.rqe && ` · RQE ${site.rqe}`}
          </p>
          <a href="#inicio" className="inline-flex h-11 items-center rounded-full bg-gold px-5 font-semibold text-ink">
            Voltar ao início
          </a>
        </div>
      </div>
    </footer>
  );
}
