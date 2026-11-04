'use client';

import { useEffect, useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: 'expo.out', duration: 1 });
}

export { gsap, ScrollTrigger, SplitText };

/** Toda animação de deslocamento mora dentro desta condição. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const DESKTOP = '(min-width: 1100px)';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Cria as animações de uma seção dentro de um gsap.matchMedia com escopo.
 * Ao desmontar (ou no StrictMode), tudo é revertido: ScrollTriggers, pins,
 * SplitText e estilos inline. Nada fica duplicado.
 */
export function useScene(scope: RefObject<HTMLElement | null>, setup: (mm: gsap.MatchMedia) => void) {
  useIsoLayoutEffect(() => {
    if (!scope.current) return;
    const mm = gsap.matchMedia(scope.current);
    setup(mm);
    return () => mm.revert();
    // a cena é montada uma vez; os dados dela são estáticos
  }, []);
}
