'use client';

import { useSyncExternalStore } from 'react';

const subscribe = (cb: () => void) => {
  const id = window.setInterval(cb, 30_000);
  return () => window.clearInterval(id);
};
const getSnapshot = () => Math.floor(Date.now() / 60_000);
const getServerSnapshot = () => 0;

/** O minuto atual no navegador; 0 no servidor e na hidratação (para não haver divergência). */
export function useMinute() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
