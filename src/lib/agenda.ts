import { schedule, type Day } from '@/data/site';

const WEEKDAYS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

/** Dia da semana e minutos do dia no horário de Vitória, qualquer que seja o fuso do visitante. */
export function nowInVitoria(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

export function slotsText(d: Day) {
  return d.slots.map((s) => `das ${s.label}`).join(' e ');
}

export type Today = {
  day: number;
  dayName: string;
  today?: Day;
  /** há consultas hoje que ainda não terminaram */
  openToday: boolean;
  /** dentro de um dos turnos agora */
  inSession: boolean;
  /** próximo dia de consultas depois de hoje */
  next: Day;
};

export function readToday(date = new Date()): Today {
  const { day, minutes } = nowInVitoria(date);
  const today = schedule.find((d) => d.day === day && d.slots.length > 0);
  const openToday = !!today && minutes < today.slots[today.slots.length - 1].to;
  const inSession = !!today && today.slots.some((s) => minutes >= s.from && minutes < s.to);
  let next = schedule[0];
  for (let i = 1; i <= 7; i++) {
    const found = schedule.find((d) => d.day === (day + i) % 7 && d.slots.length > 0);
    if (found) {
      next = found;
      break;
    }
  }
  return { day, dayName: WEEKDAYS[day], today, openToday, inSession, next };
}
