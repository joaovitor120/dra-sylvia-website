import { whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from './ui';

/** Botão flutuante do WhatsApp: sempre à mão, no canto, com um pulso discreto. */
export default function WhatsAppFab() {
  return (
    <a
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
