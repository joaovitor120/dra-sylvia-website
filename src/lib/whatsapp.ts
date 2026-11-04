import { site } from '@/data/site';

export const DEFAULT_MESSAGE = 'Oi, quero agendar uma consulta com a Dra. Sylvia.';

/**
 * Link do WhatsApp com a mensagem já escrita conforme o botão clicado.
 * O site anterior passava por /api/tracking/whatsapp-redirect; se esse
 * rastreamento continuar existindo no novo domínio, troque a base aqui.
 */
export function whatsappUrl(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
