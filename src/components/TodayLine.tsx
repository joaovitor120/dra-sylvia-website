'use client';

import { readToday, slotsText } from '@/lib/agenda';
import { useMinute } from '@/lib/useMinute';

/** Uma linha com a agenda de hoje, calculada no horário de Vitória. */
export default function TodayLine() {
  const minute = useMinute();
  const t = minute ? readToday(new Date(minute * 60_000)) : null;

  if (!t) return <span>Consultas às segundas, terças e quintas.</span>;
  if (t.today && t.openToday) {
    return (
      <span>
        Hoje, {t.dayName}, a Dra. Sylvia atende {slotsText(t.today)}.
      </span>
    );
  }
  return (
    <span>
      Próximo dia de consultas: {t.next.name.toLowerCase()}, {slotsText(t.next)}.
    </span>
  );
}
