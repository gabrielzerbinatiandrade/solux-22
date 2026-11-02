# Solux — nova experiência

React, TypeScript, Vite, Tailwind CSS e Framer Motion. Estrutura compatível com shadcn em `src/components/ui`. O componente anexado foi adaptado para o notebook 3D em CSS, com entrada pelo canto superior esquerdo, giro completo, escala e abertura da tampa; scroll controla perspectiva. Há versão responsiva e respeito à preferência por movimento reduzido.

## Executar

`npm install`

`npm run dev` — frontend em http://127.0.0.1:5173

Em outro terminal: `npm run server` — backend em http://127.0.0.1:3001. O Vite encaminha `/api` para ele.

`npm run build` — valida TypeScript e gera `dist`. Depois, `npm run server` serve o site completo e API na porta 3001.

## Vídeo

Copie `.env.example` para `.env` e configure `VITE_EXPLAINER_VIDEO_URL` com o caminho do vídeo (coloque arquivos locais em `public/videos/`). Recompile para produção. Enquanto não houver vídeo, os botões abrem a prévia ilustrativa; não há vídeo fictício. Os números e gráficos dessa prévia não são dados reais do produto.

## Conteúdo e ativos

Textos baseados em https://portalsx.com.br/solux/. Logo original em `public/solux-logo.png`; prompt anexado preservado em `references/prompt-original.txt`. Fotografias externas do Unsplash. Não foram inventados depoimentos, preços ou estatísticas de clientes. O notebook é uma representação tridimensional criada com CSS; não é um modelo fotogramétrico. Para um modelo específico de hardware, substitua o componente Laptop.

## Formulário e operação

A API valida os campos, limita tentativas e grava solicitações em `data/contacts.jsonl`, fora de `dist` e ignoradas pelo Git. Não envia e-mail automaticamente: a operação precisa consultar esses registros ou integrar CRM/e-mail. Contatos reais por WhatsApp, telefone e e-mail foram preservados. Antes da hospedagem pública, configure armazenamento persistente, HTTPS, acesso administrativo aos leads e a política de privacidade da empresa. O servidor escuta em loopback por padrão; configure um proxy reverso para publicação. Este projeto recria o site institucional, não implementa os módulos do SaaS anunciado.

## Notebook cinematográfico (atualização)

`src/components/ui/cinematic-laptop.tsx` adapta a referência do celular com Framer Motion: sequência vinculada à rolagem, entrada pelo alto à esquerda, giro completo, abertura da tampa e inclinação pelo ponteiro. Hardware em CSS 3D com teclado, trackpad, alto-falantes, dobradiça e reflexos. O prompt adicional está em `references/prompt-cinematic-original.txt`.

O vídeo configurado em `VITE_EXPLAINER_VIDEO_URL` é exibido dentro da tela. Ao ficar pelo menos 65% visível, tenta reproduzir sem som, em loop e inline; pausa ao sair ou ao ocultar a aba. Controles permitem pausar e ativar som. Falhas de autoplay mantêm o botão de reprodução disponível. Uma pausa manual é respeitada. Sem vídeo, mostra a prévia; erro no arquivo retorna à prévia. O arquivo final ainda precisa ser fornecido e a reprodução deverá ser validada com ele nos navegadores de destino.

## Imagens e direção visual atual

As três fotografias do site foram substituídas por imagens geradas e refinadas para aparência documental, salvas em `public/images/solux-campo.png`, `solux-equipe.png` e `solux-operacao.png`. São ilustrações do contexto de trabalho, não fotografias de clientes, funcionários ou obras da Solux. A logo transparente permanece em `public/solux-logo-transparent.png`. A hero usa composição sem placas inclinadas ou slogans sobre a foto; setas dos controles são ícones vetoriais, sem emojis.

## Refinamento completo

- Navegação em vidro com seção ativa, ação de demonstração e contraste adaptado à seção escura. A navegação por âncora evita atravessar toda a timeline da hero nos deslocamentos longos.
- Hero com tipografia revisada, fotografia prioritária e timeline mais curta. Notebook, campo para vídeo, animação de abertura preta e segmentos continuam disponíveis.
- Componentes separados para navegação, contato e FAQ, com labels de formulário, estados de envio/sucesso/erro, navegação por teclado e feedback de foco.
- Contato redesenhado e testado por envio real à API local com dados fictícios; o registro de teste foi removido. A API continua registrando em `data/contacts.jsonl`, sem integração automática com e-mail/CRM.
- Imagens carregadas em WebP; originais PNG foram preservados. O conjunto de fotos utilizado caiu de 15.946.809 para 1.546.648 bytes (90%). Para reproduzir a otimização: `node scripts/optimize-images.mjs`.
- JavaScript separado em chunks de aplicação, motion e GSAP. Build de produção passa sem alerta de chunk acima de 500 kB.
- Revisão visual em desktop e viewport de 390 px, correção de quebra de linha da hero e da âncora de retorno ao topo. Os campos de texto mobile usam 16 px para evitar zoom automático em navegadores móveis.
