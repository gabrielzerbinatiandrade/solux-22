import sharp from 'sharp';
import {readdir,stat} from 'node:fs/promises';
import path from 'node:path';
const dir=path.resolve('public/images');
let before=0,after=0;
for(const file of await readdir(dir)){
  if(!file.endsWith('.png'))continue;
  const src=path.join(dir,file),dest=path.join(dir,file.replace(/\.png$/,'.webp'));
  await sharp(src).resize({width:1440,withoutEnlargement:true}).webp({quality:86,effort:5}).toFile(dest);
  before+=(await stat(src)).size;after+=(await stat(dest)).size;
}
console.log(JSON.stringify({originalBytes:before,optimizedBytes:after,reduction:Math.round((1-after/before)*100)+'%'}));
