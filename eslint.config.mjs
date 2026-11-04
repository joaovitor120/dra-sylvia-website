import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

/**
 * Flat config (ESLint 9+).
 * O Next.js 16 removeu o comando `next lint`, e o `next build` não roda mais
 * lint — o lint agora é `npm run lint`, que chama a CLI do ESLint.
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // as fotografias usam <img> com srcset próprio, não next/image
      '@next/next/no-img-element': 'off',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'old_landing_page/**']),
]);

export default eslintConfig;
