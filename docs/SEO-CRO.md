# Solux — revisão de SEO e conversão

## Base real do projeto

Solux Sistemas; SaaS para gestão de terraplenagem, frota, obras, estoque e financeiro. Site institucional de uma página, em português brasileiro. Objetivo: solicitar demonstração e conversar com a equipe comercial. Contatos e endereço em Orlândia/SP preservados do site original. Público inferido do produto: gestores de empresas de terraplenagem e operações de obras. Não foi confirmada uma área geográfica de atendimento nem deve ser criada uma limitação local artificial.

## SEO: palavra-chave e metadados

- Principal recomendada: **software de gestão para terraplenagem**.
- Secundárias: sistema para terraplenagem; controle de frota; gestão financeira de obras; controle de abastecimento; gestão de estoque de peças; orçamento de obras; sistema para locação de equipamentos.
- Title aplicado: **Software de gestão para terraplenagem | Solux**.
- Description aplicada: **Controle frota, obras, estoque e financeiro com o Solux, software de gestão para terraplenagem 100% em nuvem. Solicite uma demonstração.**

A palavra-chave é recomendada pela aderência ao produto, sem pesquisa de volume, competição ou promessa de posicionamento. Não foram adicionadas repetições artificiais. A subheadline da primeira tela explica diretamente o produto.

## Estrutura semântica

- H1 único: A obra não para. Sua gestão acompanha.
- H2: chamada complementar da apresentação; Conheça o Solux; Funcionalidades; Segmentos; Vídeos; Perguntas frequentes; Contato.
- H3: detalhes dos módulos, segmento selecionado, títulos dos vídeos, benefícios e chamada de contato.
- Navegação, main, sections, articles, botões e links mantêm suas funções. FAQ utiliza botões e regiões de resposta; abas podem ser percorridas por teclado.

As âncoras `#sistema`, `#funcionalidades`, `#segmentos`, `#conteudos` e `#contato` são localizações dentro da mesma página, não páginas independentes. Não foram criadas páginas vazias ou duplicadas para tentar ranquear variações.

## Conteúdo e imagens

A headline mantém a identidade aprovada e a descrição imediatamente abaixo explicita que o Solux é um software de gestão para terraplenagem. Os módulos preservam as funções do site original. A seção de vídeos utiliza os três vídeos originais. Não foram inventadas avaliações, números de clientes, certificações, preços ou promessas de implantação.

Fotos têm nomes descritivos, WebP, lazy loading quando fora da primeira dobra e alt text factual. A imagem principal tem prioridade alta e dimensões declaradas. O conjunto de fotos foi reduzido em 90% (15.946.809 para 1.546.648 bytes). As pessoas e cenas foram geradas; não são apresentadas como clientes ou funcionários reais da Solux.

## SEO técnico implementado

- HTML pré-renderizado: texto principal, títulos e links existem no HTML entregue, antes do JavaScript.
- Metadados de título, descrição, Open Graph e Twitter Card gerados no build.
- `lang="pt-BR"`, favicon, viewport sem bloqueio de zoom e pré-conexão com provedores de fontes.
- JSON-LD de **Organization** e **WebApplication**, com informações verificáveis do conteúdo.
- Não há `offers`, preço, estrelas ou reviews sem evidência. O schema não garante rich results.
- Não foi usado BreadcrumbList em uma landing page sem hierarquia de páginas.
- FAQPage não foi acrescentado como tentativa de gerar destaque comercial. A FAQ continua acessível no HTML.
- robots.txt e sitemap.xml são gerados no build.

### Domínio e indexação

O endereço definitivo precisa ser confirmado. Defina `VITE_SITE_URL=https://dominio-definitivo/` e `SEO_INDEXABLE=true` no build de produção. Isso gera canonical, og:url, imagem social absoluta e sitemap com a URL real. Sem domínio confirmado, a cópia provisória usa **noindex,follow**, não inventa canonical e mantém o sitemap sem URLs fictícias. O robots permite rastrear o HTML para que o noindex possa ser lido.

Não criar canonical para localhost. Não apontar para portalsx.com.br sem confirmar que será o destino final. Configurar redirecionamento 301 se o endereço original for efetivamente substituído. Depois da definição do domínio, cadastrar a propriedade e enviar o sitemap no Search Console. Validar indexação, HTTPS, redirecionamentos e dados estruturados no endereço definitivo.

SEO local é secundário: o endereço de Orlândia aparece no contato e no schema Organization, mas os textos não restringem o SaaS à cidade sem confirmação do cliente.

## Conversão: achados e prioridades

| Prioridade | Achado | Tratamento |
|---|---|---|
| Crítica | Formulário local não persiste dados em hospedagem puramente estática | Versão pública usa somente canais diretos já existentes. Formulário e API ficam locais. Não há confirmação de envio fictícia. |
| Alta | Hero bonita, mas a frase isolada não explicava o produto | Subheadline explicita software, público e funções. |
| Alta | Navegar por âncoras atravessava timelines longas | Navegação direta para deslocamentos grandes; início fora do elemento fixado. |
| Alta | Ausência de domínio final | Configuração explícita de canonical, sitemap e indexação; preview não indexável. |
| Média | Possível dúvida entre conhecer e contratar | CTA solicita demonstração e leva a contato, sem sugerir compra automática. |
| Média | Excesso de espera em animações | Timeline da hero reduzida; seleção por clique continua disponível. |
| Média | Leitura e foco em interfaces de vidro | Contraste adaptado à seção escura; foco visível e labels preservadas. |
| Baixa | Informações ainda não comprovadas | Mantidas fora do site, aguardando evidência. |

Proposta de valor: **Gestão de terraplenagem, frota, obras e financeiro em um único sistema online, para acompanhar a operação e decidir com informações organizadas.**

CTA principal recomendado: **Solicitar demonstração**. No destino estático, a ação final é descrita com clareza: **Conversar pelo WhatsApp**, enviar e-mail ou ligar. Não há coleta silenciosa nem transmissão dos campos do formulário a terceiros.

Fluxo preservado: proposta → apresentação do sistema → módulos e benefícios → segmentos → vídeos reais → dúvidas → contato. As provas de confiança disponíveis são os vídeos, os canais reais de contato e a descrição específica do produto. Depoimentos, logos de clientes e resultados só devem ser acrescentados após autorização e comprovação.

## Objeções e informações pendentes

A FAQ responde sobre acesso em nuvem, segmentos, demonstração e suporte. Continuam sem definição: preço/planos, regras de contratação, migração de dados, treinamento, prazo de implantação, limites dos planos, horário/SLA de suporte, integrações e funcionamento offline. A equipe comercial deve fornecer essas informações antes de qualquer promessa pública.

É necessário confirmar a política de privacidade da empresa. Um link para contato sobre dados não é uma política completa. Não há analytics, pixels de anúncios ou coleta pública próprios adicionados. Players do YouTube carregam apenas após interação, em domínio youtube-nocookie; thumbnails e fontes ainda fazem requisições externas.

## Hipóteses de teste A/B

1. Headline atual versus “Gestão de terraplenagem, do campo ao financeiro”: hipótese de que maior especificidade aumenta contatos de empresas do segmento. Métrica: início de contato qualificado; não apenas cliques.
2. “Solicitar demonstração” versus “Conhecer o sistema com um especialista”: hipótese de redução da percepção de compromisso. Manter o mesmo destino e medir conversas iniciadas.
3. Vídeo de apresentação antes dos tutoriais: hipótese de melhor compreensão para visitantes novos. Métricas: reprodução do vídeo e início de contato.

Não foram ativados experimentos ou rastreadores sem uma decisão sobre medição, privacidade e consentimento. Não há promessa de aumento mensurado na conversão.

## Checklist

- [x] Title e description específicos.
- [x] Palavra-chave explicada naturalmente na primeira tela.
- [x] Um H1 no HTML pré-renderizado.
- [x] Conteúdo e links disponíveis antes da execução de JavaScript.
- [x] Alt text, WebP e lazy loading revisados.
- [x] Links internos e contato preservados.
- [x] Organization/WebApplication sem preço ou avaliação inventada.
- [x] Contato público sem dependência de API local.
- [x] Nenhum cadastro ou falsa urgência acrescentados.
- [x] Build e revisão visual desktop/mobile realizados.
- [ ] Domínio definitivo confirmado.
- [ ] Canonical/sitemap absolutos e indexação habilitados para esse domínio.
- [ ] Search Console, Rich Results Test e inspeção de URL no domínio final.
- [ ] Conteúdo jurídico e política de privacidade aprovados pelo cliente.
- [ ] Dados de funil e testes A/B medidos após publicação.
- [ ] Auditoria formal WCAG, Core Web Vitals em campo e pentest: não substituídos por esta revisão.

## Referências

- [Google: SEO para JavaScript e pré-renderização](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).
- [Google: guia de SEO para desenvolvedores](https://developers.google.com/search/docs/fundamentals/get-started-developers).
- [Google: dados estruturados de software](https://developers.google.com/search/docs/appearance/structured-data/software-app).
