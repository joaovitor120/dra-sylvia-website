# Dra. Sylvia Passamani — Oftalmologista em Vitória/ES

Site da Dra. Sylvia Passamani ([drasylvia.cloud](https://drasylvia.cloud/)).

| Pasta | O que é |
| --- | --- |
| raiz | a landing atual, em Next.js |
| `old_landing_page/` | a versão anterior (HTML, CSS e JS estáticos), guardada como estava; abre direto no navegador pelo `index.html` |

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · GSAP 3.15 (ScrollTrigger + SplitText) · Lenis.
Nenhum serviço pago, nenhuma API externa.

## Rodando

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run start      # serve o build
npm run lint
npm run typecheck
npm run images     # regera as imagens a partir de scripts/source/
```

## Direção criativa

**Ideia:** o círculo do olho é a única forma da página. A íris é dourada (o dourado das letras da recepção),
a pupila é preta (o fundo dos retratos da médica). As cores vêm do próprio consultório: o marfim das paredes
ripadas, o dourado da marca e o preto dos retratos.

| Momento | O que acontece |
| --- | --- |
| Abertura | A íris abre como um obturador e revela a médica dentro da pupila; o nome sobe linha a linha. |
| Saída do hero | A seção fica presa e a pupila dilata até cobrir a tela; a frase sobre prevenção aparece dentro dela. |
| Por que cuidar | Uma tabela de leitura: as linhas, da maior para a menor, saem do borrado para o nítido com a rolagem. |
| Procedimentos | Lista com marcadores circulares; cada item abre o WhatsApp com o assunto já escrito. |
| Cirurgias | "Você está cansado de usar óculos?": miopia, hipermetropia, astigmatismo e catarata; cada lente mostra a visão distorcida e fica nítida com a rolagem. |
| A médica | Faixa escura de borda a borda, retrato em círculo com anel dourado. |
| Consultório | Seção presa: uma lente só, e cada foto abre em círculo sobre a anterior. |
| Horários (ao vivo) | Calcula o dia e a hora de Vitória e diz se há consultas hoje ou qual é o próximo dia; o botão já pede horário para esse dia. |
| Como chegar | O caminho da rua até a sala 505; a barra se enche com a rolagem; o mapa só carrega se a pessoa pedir. |
| Chamada final | A íris volta e se abre com a rolagem, com o monograma "sp" no centro. |

Tipografia: Montserrat (a mesma família geométrica do letreiro da recepção). Com `prefers-reduced-motion`
nada fica preso nem se desloca, e sem JavaScript a página aparece inteira.

## Arquitetura

```
src/
  app/            layout (fontes, metadata), page (ordem + JSON-LD), globals.css (todo o sistema visual)
  components/     uma seção por arquivo; Motion.tsx = Lenis + entradas por atributo + botões magnéticos
  data/site.ts    TODO o conteúdo (textos, horários, endereço, FAQ). Edite aqui.
  lib/            gsap.ts (useScene com matchMedia e limpeza), agenda.ts (horário de Vitória), whatsapp.ts
scripts/
  optimize-images.mjs   gera WebP em várias larguras e as máscaras da marca, a partir dos
                        originais em old_landing_page/assets/
```

## Pendências para confirmar com a clínica

1. **CRM e RQE** — a publicidade médica (CFM, Res. 2.336/2023) pede nome, CRM e RQE. O site anterior não
   informava. Preencha `crm` e `rqe` em `src/data/site.ts` e eles aparecem no rodapé.
2. **Retrato de jaleco branco** — o bordado do jaleco diz outro nome/área. A foto é usada recortada só no rosto
   (seção "A médica"). Vale trocar por um retrato com o jaleco da oftalmologia.
3. **Rastreamento do WhatsApp** — o site antigo passava por `/api/tracking/whatsapp-redirect`. O novo usa `wa.me`
   direto (mesmo número e mesma mensagem). Se o rastreamento continuar, troque a base em `src/lib/whatsapp.ts`.
4. **Depoimentos e vídeo** — não existem no material atual; nada foi inventado.
