'use client';

import { useLayoutEffect, useRef } from 'react';
import { DESKTOP, MOTION_OK, ScrollTrigger, SplitText, gsap, useScene } from '@/lib/gsap';
import { whatsappUrl } from '@/lib/whatsapp';
import { Button, Photo, TextLink } from './ui';
import TodayLine from './TodayLine';
import { Statement } from './Prevention';

/**
 * Abertura: a íris dourada abre como um obturador e revela a médica dentro da
 * pupila. Ao rolar, a pupila se dilata até tomar a tela e a página entra nela.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  // No celular o círculo começa logo abaixo do texto (--copy-bottom), qualquer que
  // seja a altura útil da tela. Medido antes da cena, que calcula a escala a partir dele.
  useLayoutEffect(() => {
    const hero = root.current;
    const end = hero?.querySelector<HTMLElement>('[data-hero-end]');
    if (!hero || !end) return;
    let last = -1;
    const measure = () => {
      // offsetTop ignora o deslocamento da animação de entrada
      let y = end.offsetHeight;
      for (let el: HTMLElement | null = end; el && el !== hero; el = el.offsetParent as HTMLElement | null) {
        y += el.offsetTop;
      }
      if (Math.abs(y - last) < 1) return;
      last = y;
      hero.style.setProperty('--copy-bottom', `${Math.round(y)}px`);
      ScrollTrigger.refresh();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(hero);
    ro.observe(end);
    return () => ro.disconnect();
  }, []);

  useScene(root, (mm) => {
    mm.add({ motion: MOTION_OK, desktop: DESKTOP }, (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
      (window as unknown as { __motionReady?: boolean }).__motionReady = true;
      if (!motion) return;

      const el = root.current!;
      const iris = el.querySelector<HTMLElement>('[data-hero="iris"]')!;
      const portrait = el.querySelector<HTMLElement>('.hero__portrait')!;
      const title = el.querySelector<HTMLElement>('[data-hero="title"]')!;
      const fades = el.querySelectorAll<HTMLElement>('[data-hero="fade"]');
      const copy = el.querySelector<HTMLElement>('.hero__copy')!;
      const inside = el.querySelector<HTMLElement>('.hero__inside')!;
      // a frase do capítulo seguinte passa a morar dentro da pupila
      document.documentElement.classList.add('hero-scene');

      // --- abertura (até ~1,3 s) ---
      const split = SplitText.create(title, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
      gsap.set(title, { opacity: 1 });
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
      intro
        .fromTo(
          iris,
          { clipPath: 'circle(0% at 50% 50%)' },
          { clipPath: 'circle(71% at 50% 50%)', duration: 1.25, ease: 'power3.inOut' },
          0,
        )
        .from(portrait, { scale: 1.14, duration: 1.6 }, 0.15)
        .from(split.lines, { yPercent: 112, duration: 0.85, stagger: 0.08 }, 0.1)
        .fromTo(fades, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.07 }, 0.4);

      // --- saída: a pupila dilata até cobrir a tela ---
      const header = document.querySelector('.site-header');
      const coverScale = () => {
        const r = iris.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2 + window.scrollY - el.offsetTop;
        const w = el.clientWidth;
        const h = el.clientHeight;
        const far = Math.max(Math.hypot(cx, cy), Math.hypot(w - cx, cy), Math.hypot(cx, h - cy), Math.hypot(w - cx, h - cy));
        return (far / ((r.width / 2) * 0.948)) * 1.04;
      };

      const out = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: desktop ? '+=120%' : '+=100%',
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          // é a primeira cena presa: medida antes das outras, inclusive quando é recriada no resize
          refreshPriority: 1,
          onUpdate: (self) => header?.classList.toggle('is-dark', self.progress > 0.62),
          onLeave: () => header?.classList.add('is-dark'),
        },
      });
      out
        .to(copy, { yPercent: -14, opacity: 0, duration: 0.12, ease: 'power1.in' }, 0)
        .to(iris, { scale: coverScale, duration: 0.66, ease: 'power2.in' }, 0.04)
        .to(portrait, { opacity: 0, scale: 0.92, duration: 0.25 }, 0.3)
        .fromTo(inside, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.22, ease: 'power2.out' }, 0.66)
        .to({}, { duration: 0.12 });
      ScrollTrigger.sort();

      return () => {
        document.documentElement.classList.remove('hero-scene');
        split.revert();
        header?.classList.remove('is-dark');
      };
    });
    ScrollTrigger.refresh();
  });

  return (
    <section ref={root} id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__iris" data-hero="iris" aria-hidden="true">
        <div className="hero__pupil">
          <div className="hero__view">
            <Photo
              name="sylvia-retrato"
              widths={[640, 960, 1280]}
              sizes="(max-width: 1099px) 64vw, 72svh"
              alt=""
              width={1086}
              height={1448}
              className="hero__portrait"
              priority
            />
          </div>
        </div>
      </div>

      <div className="hero__inside frame">
        <Statement reveal={false} />
      </div>

      <div className="frame h-full">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title" data-hero="title">
            Dra. Sylvia
            <br />
            Passamani
          </h1>
          <p className="hero__lead mt-8 max-w-[34rem] text-lead" data-hero="fade">
            Oftalmologista no Centro de Vitória/ES, com mais de 30 anos de experiência.
          </p>
          <div className="hero__actions mt-9 flex flex-wrap items-center gap-x-7 gap-y-4" data-hero="fade" data-hero-end>
            <Button href={whatsappUrl()} variant="ink" magnetic>
              Agendar pelo WhatsApp
            </Button>
            <TextLink href="#procedimentos" className="hero__more">
              Ver procedimentos
            </TextLink>
          </div>
          <div className="mt-8 hidden items-center gap-3 text-small min-[1100px]:flex" data-hero="fade">
            <span className="hero__status-dot" aria-hidden="true" />
            <TodayLine />
          </div>
        </div>
      </div>
    </section>
  );
}
