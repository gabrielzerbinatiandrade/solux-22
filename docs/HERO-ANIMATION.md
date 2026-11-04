# Hero integrada da Solux

Componente: `src/components/ui/immersive-solux-hero.tsx`.
Estilos: `src/components/ui/unified-hero.css`.

A fotografia existente é ilustrativa e gerada. O notebook usa o modelo CSS 3D existente, sem carregar Three.js. Sua tela continua vazia enquanto `VITE_EXPLAINER_VIDEO_URL` não estiver configurada. Com um vídeo válido, a reprodução começa sem som quando a tela entra em vista, com controles de reprodução e áudio.

## Ajustar o movimento

O objeto `timing` no início do componente define os tempos em segundos:

- `photo`: duração da entrada da foto (0,95).
- `text`: duração da entrada do texto (0,8).
- `laptop`: duração do deslocamento e rotação do notebook (1,65).
- `laptopDelay`: espera antes da entrada do notebook (0,25).

Aumente `laptop` para uma entrada mais lenta. Os valores `initial` do elemento `.unified-device` controlam deslocamento, inclinação e escala inicial; `animate` define a posição final. A rotação final de -7 graus preserva a perspectiva sem dificultar a leitura do vídeo.

## Acessibilidade

`useReducedMotion` remove deslocamentos e zoom de entrada quando o sistema solicita movimento reduzido. O botão de movimento permite finalizar a entrada e pausar o vídeo. Links e controles têm indicação de foco. Há um único H1, texto alternativo para a foto e links por âncora. No celular, o notebook fica abaixo do texto. A tela vazia é identificada para leitores de tela como reservada para o vídeo.

## Validação

`npm run build` e `node scripts/check-public-build.mjs` verificam compilação, pré-renderização, H1, metadados e os contatos da versão estática. Esses checks não substituem inspeção visual em dispositivos reais.
