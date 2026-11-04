'use client';

import { schedule, scheduleNote } from '@/data/site';
import { readToday, slotsText } from '@/lib/agenda';
import { useMinute } from '@/lib/useMinute';
import { whatsappUrl } from '@/lib/whatsapp';
import { Button } from './ui';

/**
 * A agenda da médica, lida no horário de Vitória: a frase muda conforme o dia
 * e a hora da visita, e o botão já pede horário para o próximo dia de consultas.
 * Sem script, a semana inteira continua legível.
 */
export default function Agenda() {
  const minute = useMinute();
  const t = minute ? readToday(new Date(minute * 60_000)) : null;

  let sentence = 'A Dra. Sylvia atende às segundas e terças, das 8h às 11h40 e das 14h às 18h, e às quintas, das 8h às 12h.';
  if (t) {
    if (t.today && t.openToday) {
      sentence = `Hoje é ${t.dayName}: a Dra. Sylvia atende ${slotsText(t.today)}.`;
    } else if (t.today) {
      sentence = `As consultas de hoje já terminaram. O próximo dia é ${t.next.name.toLowerCase()}, ${slotsText(t.next)}.`;
    } else {
      sentence = `Hoje é ${t.dayName} e não há consultas. O próximo dia é ${t.next.name.toLowerCase()}, ${slotsText(t.next)}.`;
    }
  }
  const nextName = t ? t.next.name.toLowerCase() : null;

  return (
    <section id="horarios" className="bg-gold py-section text-ink" aria-labelledby="horarios-title">
      <div className="frame grid-12 gap-y-14">
        <div className="col-span-12 lg:col-span-5">
          <h2 id="horarios-title" className="t-head max-w-[10ch]" data-split>
            Horários da Dra. Sylvia
          </h2>
          <p className="mt-8 max-w-[24ch] text-lead font-medium" aria-live="polite" data-reveal>
            {sentence}
          </p>
          <div className="mt-10" data-reveal>
            <Button
              href={whatsappUrl(
                nextName
                  ? `Oi, quero agendar uma consulta com a Dra. Sylvia para ${nextName}.`
                  : 'Oi, quero agendar uma consulta com a Dra. Sylvia.',
              )}
              variant="ink"
              magnetic
            >
              {nextName ? `Pedir horário para ${nextName}` : 'Pedir horário'}
            </Button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:pt-4">
          <ol className="week" aria-label="Agenda da semana" data-reveal>
            {schedule.map((d) => {
              const off = d.slots.length === 0;
              const isToday = t?.day === d.day;
              return (
                <li
                  key={d.day}
                  className={`week__day ${off ? 'week__day--off' : ''} ${isToday ? 'week__day--today' : ''}`}
                  data-reveal-item
                >
                  <span className="week__disc" aria-hidden="true">
                    {d.short}
                  </span>
                  <span className="text-small font-semibold leading-snug">
                    <span className="sr-only">{d.name}: </span>
                    {off ? 'Sem atendimento' : d.slots.map((s) => <span key={s.label} className="block">{s.label}</span>)}
                    {isToday && <span className="mt-1 block font-medium">hoje</span>}
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="mt-12 max-w-[52ch]" data-reveal>
            {scheduleNote}
          </p>
        </div>
      </div>
    </section>
  );
}
