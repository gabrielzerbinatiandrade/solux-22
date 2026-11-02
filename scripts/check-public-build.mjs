import {readFile,stat} from 'node:fs/promises';
const html=await readFile('dist/index.html','utf8');
const checks={
  h1Count:(html.match(/<h1\b/g)||[]).length,
  title:html.match(/<title>(.*?)<\/title>/)?.[1],
  description:html.includes('name="description"'),
  schema:html.includes('application/ld+json'),
  renderedContent:html.includes('software de gestão para terraplenagem'),
  captureFields:(html.match(/id="contact-(?:name|email|phone|company)"/g)||[]).length,
  directWhatsApp:html.includes('https://wa.me/5516992411353'),
  og:html.includes('property="og:title"'),
  previewNoIndex:html.includes('noindex,follow'),
  robots:(await stat('dist/robots.txt')).isFile(),
  sitemap:(await stat('dist/sitemap.xml')).isFile(),
};
console.log(JSON.stringify(checks,null,2));
if(checks.h1Count!==1||!checks.description||!checks.schema||!checks.renderedContent||checks.captureFields!==0||!checks.directWhatsApp)process.exit(1);
