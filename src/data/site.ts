/**
 * Todo o conteúdo do site.
 * REGRA: nada aqui é inventado. Textos, horários, endereço e respostas vêm do site
 * publicado da clínica (drasylvia.cloud). Para editar o site, edite este arquivo.
 */

export const site = {
  name: 'Dra. Sylvia Passamani',
  fullName: 'Sylvia Renata Passamani',
  role: 'Oftalmologista',
  city: 'Vitória/ES',
  url: 'https://drasylvia.cloud',
  title: 'Dra. Sylvia Passamani | Oftalmologista em Vitória/ES',
  description:
    'Agende sua consulta com a Dra. Sylvia Passamani, oftalmologista em Vitória/ES. Atendimento humanizado, cuidado com a visão e facilidade para agendar pelo WhatsApp.',
  whatsappNumber: '5527981396572',
  whatsappDisplay: '(27) 98139-6572',
  mapsUrl: 'https://maps.app.goo.gl/pfcDyHCfAD7dyBkD9?g_st=ac',
  mapsEmbed:
    'https://www.google.com/maps?q=Rua%20Graciano%20Neves%2C%2073%2C%20Centro%2C%20Vit%C3%B3ria%2C%20ES&output=embed',
  /**
   * CRM e RQE: a publicidade médica (CFM, Res. 2.336/2023) pede nome, CRM e RQE.
   * O site anterior não informava; preencha aqui e eles aparecem no rodapé.
   */
  crm: '',
  rqe: '',
} as const;

export const address = {
  street: 'Rua Graciano Neves, 73',
  district: 'Centro, Vitória/ES',
  building: 'Ed. Lea, sala 505',
  landmark: 'Em cima da loja O Boticário',
} as const;

/** O caminho até a sala, na ordem em que o paciente faz. */
export const route = [
  { title: 'Rua Graciano Neves, 73', text: 'Centro de Vitória. Estacionamento rotativo nas ruas próximas.' },
  { title: 'Ed. Lea', text: 'Em cima da loja O Boticário.' },
  { title: 'Recepção do edifício', text: 'Entrada pela recepção, elevador à esquerda.' },
  { title: '5º andar, sala 505', text: 'É aqui. A equipe recebe você na sala.' },
] as const;

export type Service = {
  id: string;
  name: string;
  text: string;
  action: string;
  message: string;
  urgent?: boolean;
  /** quando o item leva a uma seção da página em vez de abrir o WhatsApp */
  href?: string;
};

export const services: readonly Service[] = [
  {
    id: 'consulta',
    name: 'Consulta oftalmológica',
    text: 'Avaliação cuidadosa para entender sua saúde ocular e orientar o melhor acompanhamento.',
    action: 'Agendar avaliação',
    message: 'Oi, quero agendar uma consulta oftalmológica com a Dra. Sylvia.',
  },
  {
    id: 'cirurgias',
    name: 'Cirurgias oculares',
    text: 'Cirurgias de miopia, hipermetropia, astigmatismo e catarata, com indicação feita após avaliação completa.',
    action: 'Conhecer as cirurgias',
    message: 'Oi, quero agendar uma avaliação para cirurgia com a Dra. Sylvia.',
    href: '#cirurgias',
  },
  {
    id: 'glaucoma',
    name: 'Acompanhamento de glaucoma',
    text: 'Acompanhamento regular para pacientes que precisam monitorar a saúde ocular com atenção contínua.',
    action: 'Agendar avaliação',
    message: 'Oi, quero agendar um acompanhamento de glaucoma com a Dra. Sylvia.',
  },
  {
    id: 'lentes',
    name: 'Lentes de contato',
    text: 'Orientação para pacientes que usam ou desejam avaliar o uso de lentes de contato.',
    action: 'Agendar avaliação',
    message: 'Oi, quero agendar uma avaliação para lentes de contato com a Dra. Sylvia.',
  },
  {
    id: 'urgencia',
    name: 'Urgência ocular',
    text: 'Atendimento para dor forte nos olhos, perda súbita de visão, trauma ocular, olho vermelho ou secreção intensa.',
    action: 'Falar no WhatsApp agora',
    message: 'Oi, estou com uma urgência ocular e preciso de atendimento com a Dra. Sylvia.',
    urgent: true,
  },
  {
    id: 'exames',
    name: 'Mapeamento de retina e outros exames',
    text: 'Exames oftalmológicos para investigar, diagnosticar e acompanhar a saúde dos seus olhos.',
    action: 'Agendar exame',
    message: 'Oi, quero agendar um mapeamento de retina ou outro exame oftalmológico com a Dra. Sylvia.',
  },
];

/**
 * Cirurgias oculares. Texto informativo, sem promessa de resultado (publicidade médica):
 * a indicação de cada cirurgia é sempre feita em consulta.
 * `kind` decide como a lente da página simula a visão antes da correção.
 */
export type Surgery = {
  id: string;
  name: string;
  symptom: string;
  treatment: string;
  kind: 'far' | 'near' | 'astig' | 'cataract';
};

export const surgeries: readonly Surgery[] = [
  {
    id: 'miopia',
    name: 'Miopia',
    symptom: 'O que está longe fica embaçado: a placa da rua, o quadro, o rosto de quem vem chegando.',
    treatment:
      'A cirurgia refrativa corrige o grau na córnea e pode reduzir ou eliminar a dependência de óculos e lentes de contato.',
    kind: 'far',
  },
  {
    id: 'hipermetropia',
    name: 'Hipermetropia',
    symptom: 'Ler de perto exige esforço: a vista cansa no celular, no livro, no cardápio.',
    treatment:
      'A cirurgia refrativa também trata a hipermetropia, conforme o grau e as condições de cada olho.',
    kind: 'near',
  },
  {
    id: 'astigmatismo',
    name: 'Astigmatismo',
    symptom: 'As imagens ficam distorcidas e as letras parecem duplicadas, de perto e de longe.',
    treatment:
      'A correção pode ser feita na mesma cirurgia refrativa, sozinha ou junto com a miopia ou a hipermetropia.',
    kind: 'astig',
  },
  {
    id: 'catarata',
    name: 'Catarata',
    symptom: 'O cristalino perde a transparência e a visão vai ficando opaca, como através de um vidro fosco.',
    treatment: 'A cirurgia substitui o cristalino opaco por uma lente intraocular transparente.',
    kind: 'cataract',
  },
];

export const surgeryNote =
  'Nem todo olho é candidato à cirurgia refrativa: idade, estabilidade do grau e espessura da córnea são avaliadas antes. A indicação é sempre feita em consulta.';

/** "Por que cuidar da visão regularmente?" — a tabela de leitura da página. */
export const reasons = [
  { title: 'Prevenção', text: 'Acompanhamento para identificar alterações antes que tragam maior impacto.' },
  { title: 'Diagnóstico precoce', text: 'Avaliação profissional para investigar sinais e sintomas com responsabilidade.' },
  { title: 'Saúde dos olhos', text: 'Cuidado regular para visão embaçada, dor, ardência ou dificuldade para enxergar.' },
  { title: 'Orientação individualizada', text: 'Explicações claras e cuidado adequado às necessidades de cada paciente.' },
] as const;

export const about = {
  education: 'Médica oftalmologista formada pela EMESCAM em 1994.',
  practice: 'Oftalmologia geral, oftalmopediatria e cirurgias de miopia, hipermetropia, astigmatismo e catarata.',
  care: 'Um atendimento humano, acolhedor e ético, focado na prevenção, no diagnóstico e no acompanhamento da saúde ocular.',
  highlights: [
    'Atendimento humanizado e acolhedor',
    'Localização de fácil acesso',
    'Ambiente organizado e confortável',
    'Contato e agendamento pelo WhatsApp',
  ],
} as const;

export const clinicPhotos = [
  {
    src: 'autorrefrator',
    caption: 'Equipamentos de diagnóstico',
    alt: 'Equipamento de diagnóstico oftalmológico diante do painel com a marca da Dra. Sylvia Passamani',
  },
  {
    src: 'consultorio',
    caption: 'Sala de atendimento',
    alt: 'Sala de atendimento com cadeira oftalmológica, lâmpada de fenda e refrator',
  },
  {
    src: 'marca-parede',
    caption: 'Recepção da clínica',
    alt: 'Painel da recepção com o monograma e o nome Sylvia Passamani, Oftalmologista, em letras douradas',
  },
] as const;

/**
 * Agenda da médica. Dias da semana no padrão do JavaScript (0 = domingo).
 * `slots` em minutos desde a meia-noite, para o cálculo do "hoje".
 */
export type Day = {
  day: number;
  name: string;
  short: string;
  slots: readonly { from: number; to: number; label: string }[];
};

export const schedule: readonly Day[] = [
  {
    day: 1,
    name: 'Segunda-feira',
    short: 'Seg',
    slots: [
      { from: 480, to: 700, label: '8h às 11h40' },
      { from: 840, to: 1080, label: '14h às 18h' },
    ],
  },
  {
    day: 2,
    name: 'Terça-feira',
    short: 'Ter',
    slots: [
      { from: 480, to: 700, label: '8h às 11h40' },
      { from: 840, to: 1080, label: '14h às 18h' },
    ],
  },
  { day: 3, name: 'Quarta-feira', short: 'Qua', slots: [] },
  { day: 4, name: 'Quinta-feira', short: 'Qui', slots: [{ from: 480, to: 720, label: '8h às 12h' }] },
  { day: 5, name: 'Sexta-feira', short: 'Sex', slots: [] },
];

export const scheduleNote =
  'Pausa para o almoço das 12h às 14h. Agendamentos para o mesmo dia dependem de autorização do consultório.';

export const faq = [
  {
    q: 'Como faço para agendar uma consulta?',
    a: 'Você pode agendar diretamente pelo WhatsApp, clicando em qualquer botão de agendamento da página.',
  },
  { q: 'A clínica atende por convênio?', a: 'Sim, Unimed. Também há atendimento particular.' },
  {
    q: 'Quais procedimentos a Dra. Sylvia realiza?',
    a: 'Consulta oftalmológica, cirurgias de miopia, hipermetropia, astigmatismo e catarata, acompanhamento de glaucoma, lentes de contato, urgência ocular, mapeamento de retina e outros exames oftalmológicos.',
  },
  {
    q: 'Preciso levar exames anteriores?',
    a: 'Sim. Traga suas receitas antigas, se tiver. Quem usa lentes de contato deve retirá-las 24 horas antes da consulta.',
  },
  {
    q: 'Como funciona o retorno?',
    a: 'O retorno depende do motivo e é sem custo apenas até 30 dias após a última consulta. Sempre sob marcação prévia.',
  },
  {
    q: 'Onde fica a clínica?',
    a: 'Na Rua Graciano Neves, 73, Centro, Vitória/ES, Ed. Lea, sala 505, em cima da loja O Boticário.',
  },
  {
    q: 'O atendimento é pelo WhatsApp?',
    a: 'Sim. O WhatsApp facilita o contato para agendamento, remarcação, cancelamento e dúvidas sobre o atendimento.',
  },
  {
    q: 'Quais são as formas de pagamento?',
    a: 'Pix, dinheiro e cartões de débito e de crédito.',
  },
] as const;
