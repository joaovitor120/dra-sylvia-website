import type { Config } from 'tailwindcss';

/**
 * Os tokens vivem em src/app/globals.css como custom properties.
 * Aqui eles são expostos ao Tailwind para que nenhum utilitário use um hex avulso.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ivory: 'var(--ivory)',
        'ivory-2': 'var(--ivory-2)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        pupil: 'var(--pupil)',
        gold: 'var(--gold)',
        'gold-deep': 'var(--gold-deep)',
        'gold-light': 'var(--gold-light)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        small: 'var(--fs-small)',
        body: 'var(--fs-body)',
        lead: 'var(--fs-lead)',
        head: 'var(--fs-head)',
        display: 'var(--fs-display)',
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'var(--section)',
      },
      maxWidth: {
        frame: 'var(--frame)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(.22, 1, .36, 1)',
        expo: 'cubic-bezier(.16, 1, .3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
