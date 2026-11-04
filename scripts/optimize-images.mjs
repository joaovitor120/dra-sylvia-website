/**
 * Gera as imagens do site a partir dos originais da clínica
 * (scripts/source/ se existir; senão, os mesmos arquivos em old_landing_page/assets/).
 * - fotos: WebP em duas ou três larguras, com o recorte que cada seção usa;
 * - marca: o monograma "sp" e o logotipo viram máscaras alfa (PNG), para a cor
 *   ser decidida no CSS (dourado no escuro, tinta no claro).
 *
 * Uso: npm run images
 */
import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = path.resolve(existsSync('scripts/source') ? 'scripts/source' : 'old_landing_page/assets');
const OUT = path.resolve('public/images');
await mkdir(OUT, { recursive: true });

const photos = [
  // retrato de jaleco lilás, braços cruzados: o hero
  { file: 'dra_sylvia_profile_1.png', name: 'sylvia-retrato', widths: [640, 960, 1280] },
  // retrato de jaleco branco: só cabeça e ombros (o bordado do jaleco fica fora do quadro)
  {
    file: 'dra_sylvia_profile_2.png',
    name: 'sylvia-perfil',
    widths: [600, 900],
    extract: { left: 60, top: 40, width: 1000, height: 1000 },
  },
  { file: 'dra_sylvia_1.PNG', name: 'autorrefrator', widths: [800, 1440] },
  { file: 'dra_sylvia_2.PNG', name: 'consultorio', widths: [800, 1440] },
  { file: 'dra_sylvia_3.PNG', name: 'marca-parede', widths: [800, 1440] },
];

for (const p of photos) {
  for (const w of p.widths) {
    let img = sharp(path.join(SRC, p.file));
    if (p.extract) img = img.extract(p.extract);
    await img
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(path.join(OUT, `${p.name}-${w}.webp`));
  }
  console.log('ok', p.name);
}

/** Converte a arte dourada sobre branco em máscara: tinta = opaco, papel = transparente. */
async function alphaMask(file, outName, extract, width) {
  let img = sharp(path.join(SRC, file));
  if (extract) img = img.extract(extract);
  const { data, info } = await img
    .resize({ width, withoutEnlargement: true })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    // o azul separa bem o ouro (azul baixo) do papel branco (azul alto)
    const b = data[i + 2];
    const a = Math.max(0, Math.min(255, Math.round(((235 - b) / 150) * 255)));
    out[j] = 0;
    out[j + 1] = 0;
    out[j + 2] = 0;
    out[j + 3] = a;
  }
  // recorta rente à arte: a marca ocupa a altura inteira de onde for colocada
  const trimmed = await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer();
  const res = await sharp(trimmed)
    .trim({ threshold: 1 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, outName));
  console.log('ok', outName, res.width, res.height);
}

await alphaMask('logo_dra_2.png', 'monograma-sp.png', { left: 60, top: 120, width: 640, height: 440 }, 640);
await alphaMask('logo_dra_2.png', 'logotipo.png', { left: 40, top: 100, width: 2110, height: 480 }, 1600);
