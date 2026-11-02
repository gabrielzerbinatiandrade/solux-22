import {readFile,writeFile} from 'node:fs/promises';
import {render} from '../.build-ssr/entry-server.js';
const path=new URL('../dist/index.html',import.meta.url);
let html=await readFile(path,'utf8');
html=html.replace('<div id="root"></div>',`<div id="root">${render()}</div>`);
html=html.replace('</head>',`<noscript><style>.gsap-reveal{visibility:visible!important}.cinematic-prompt{height:auto!important;min-height:100vh;display:block!important;padding-top:90px}.hero-text-wrapper{position:relative!important;opacity:1!important;transform:none!important;filter:none!important;min-height:85vh}.text-track,.text-days{opacity:1!important;visibility:visible!important;clip-path:none!important;transform:none!important;filter:none!important}.cta-wrapper,.cinematic-prompt>div:last-child{display:none!important}.about-editorial-photo,.about-editorial-copy,.about-bottom-line,.section-heading,.demo-form{opacity:1!important;transform:none!important}.scroll-segments.segments{height:auto!important;background:#111!important}.segments-sticky{height:auto!important;position:relative!important;background:#111!important}.segments-inner{opacity:1!important;transform:none!important;min-height:750px}.segment-expanding-panel,.segment-orange-underlay{display:none!important}</style></noscript></head>`);
await writeFile(path,html);
console.log('HTML pré-renderizado gravado em dist/index.html.');
