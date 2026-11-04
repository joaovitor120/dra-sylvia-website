'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { MOTION_OK, ScrollTrigger, SplitText, gsap } from '@/lib/gsap';

/**
 * A camada de movimento compartilhada, montada uma vez no fim da página:
 * - Lenis (rolagem com inércia) no mesmo relógio do GSAP, um único laço;
 * - entradas por atributo: data-split (títulos linha a linha), data-reveal
 *   (partes de um bloco em sequência), data-shutter (foto que abre em círculo),
 *   data-focus (texto que ganha nitidez com a rolagem), data-parallax;
 * - botões magnéticos (data-magnetic), só com ponteiro fino.
 * Com movimento reduzido nada disso roda e a página aparece inteira.
 */
export default function Motion() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    let lenis: Lenis | null = null;

    mm.add(MOTION_OK, () => {
      // ---- rolagem ----
      lenis = new Lenis({ lerp: 0.12, anchors: { offset: -72 }, autoRaf: false });
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // ---- títulos linha a linha ----
      gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 112,
              duration: 1.05,
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            }),
        });
      });

      // ---- partes de um bloco, na ordem de leitura ----
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>('[data-reveal-item]');
        const targets = items.length ? items : [group];
        gsap.from(targets, {
          y: 28,
          opacity: 0,
          duration: 0.95,
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: 'top 86%', once: true },
        });
      });

      // ---- foto que abre em círculo, como a pupila ----
      gsap.utils.toArray<HTMLElement>('[data-shutter]').forEach((el) => {
        const img = el.querySelector('img');
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
        tl.fromTo(
          el,
          { clipPath: 'circle(0% at 50% 50%)' },
          { clipPath: 'circle(71% at 50% 50%)', duration: 1.3, ease: 'power3.inOut' },
        );
        if (img) tl.from(img, { scale: 1.18, duration: 1.7 }, 0);
      });

      // ---- foco: do borrado ao nítido conforme a linha sobe na tela ----
      gsap.utils.toArray<HTMLElement>('[data-focus]').forEach((el) => {
        gsap.fromTo(
          el,
          { filter: 'blur(14px)', opacity: 0.28 },
          {
            filter: 'blur(0px)',
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 52%', scrub: true },
          },
        );
      });

      // ---- deriva lenta dentro da moldura ----
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const amount = Number(el.dataset.parallax || 10);
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });

      return () => {
        gsap.ticker.remove(tick);
        lenis?.destroy();
        lenis = null;
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      };
    });

    // ---- botões magnéticos ----
    mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
      const cleanups: (() => void)[] = [];
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
        const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          x((e.clientX - (r.left + r.width / 2)) * 0.22);
          y((e.clientY - (r.top + r.height / 2)) * 0.3);
        };
        const leave = () => {
          x(0);
          y(0);
        };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        cleanups.push(() => {
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerleave', leave);
        });
      });
      return () => cleanups.forEach((c) => c());
    });

    // as cenas presas foram criadas pelas seções; ordena e mede tudo de novo
    // quando as fontes chegam, para os pontos de início ficarem exatos
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => mm.revert();
  }, []);

  return null;
}
