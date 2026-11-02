import {readFile,writeFile} from 'node:fs/promises';
const file=new URL('../dist/index.html',import.meta.url);
let html=await readFile(file,'utf8');
const title='Software de gestão para terraplenagem | Solux';
const description='Controle frota, obras, estoque e financeiro com o Solux, software de gestão para terraplenagem 100% em nuvem. Solicite uma demonstração.';
const configured=process.env.VITE_SITE_URL;
let siteUrl=null;
if(configured){const url=new URL(configured);if(url.protocol!=='https:')throw Error('O domínio de publicação deve usar HTTPS.');url.hash='';url.search='';siteUrl=url.href.endsWith('/')?url.href:url.href+'/';}
const indexable=!!siteUrl&&process.env.SEO_INDEXABLE==='true';
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
html=html.replace(/<title>.*?<\/title>/,`<title>${title}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/>/,`<meta name="description" content="${description}"/>`);
const organization={'@type':'Organization',name:'Solux Sistemas',email:'soluxsistema@gmail.com',telephone:'+55-16-3826-0061',address:{'@type':'PostalAddress',streetAddress:'Rua 06, 46A',addressLocality:'Orlândia',addressRegion:'SP',addressCountry:'BR'},sameAs:['https://www.youtube.com/@soluxbrasil9002'],...(siteUrl?{'@id':siteUrl+'#organizacao',url:siteUrl,logo:siteUrl+'solux-logo-transparent.png'}:{})};
const software={'@type':'WebApplication',name:'Solux',applicationCategory:'BusinessApplication',operatingSystem:'Web',inLanguage:'pt-BR',description:'Sistema em nuvem para gestão de terraplenagem, frota, obras, estoque e financeiro.',featureList:['Controle de frota','Gestão financeira','Obras e orçamentos','Estoque e compras'],...(siteUrl?{'@id':siteUrl+'#software',url:siteUrl,publisher:{'@id':siteUrl+'#organizacao'}}:{publisher:{'@type':'Organization',name:'Solux Sistemas'}})};
const image=siteUrl?siteUrl+'images/solux-campo.webp':'/images/solux-campo.webp';
const tags=[
`<meta name="robots" content="${indexable?'index,follow,max-image-preview:large':'noindex,follow'}"/>`,
'<meta property="og:type" content="website"/>','<meta property="og:locale" content="pt_BR"/>','<meta property="og:site_name" content="Solux Sistemas"/>',
`<meta property="og:title" content="${title}"/>`,`<meta property="og:description" content="${description}"/>`,`<meta property="og:image" content="${escape(image)}"/>`,'<meta property="og:image:alt" content="Ilustração de uma operação de terraplenagem"/>',
'<meta name="twitter:card" content="summary_large_image"/>',`<meta name="twitter:title" content="${title}"/>`,`<meta name="twitter:description" content="${description}"/>`,`<meta name="twitter:image" content="${escape(image)}"/>`,
'<link rel="preconnect" href="https://fonts.googleapis.com"/>','<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>',
`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':[organization,software]}).replace(/</g,'\\u003c')}</script>`,
...(siteUrl?[`<link rel="canonical" href="${escape(siteUrl)}"/>`,`<meta property="og:url" content="${escape(siteUrl)}"/>`]:[]),
];
html=html.replace('</head>',tags.join('\n')+'\n</head>');
await writeFile(file,html);
await writeFile(new URL('../dist/robots.txt',import.meta.url),`User-agent: *\nAllow: /\n${siteUrl?'Sitemap: '+siteUrl+'sitemap.xml\n':''}`);
await writeFile(new URL('../dist/sitemap.xml',import.meta.url),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${siteUrl?'<url><loc>'+escape(siteUrl)+'</loc></url>':''}</urlset>\n`);
console.log(JSON.stringify({seo:true,preRender:html.includes('Software de gestão'),siteUrl,indexable,canonical:!!siteUrl}));
