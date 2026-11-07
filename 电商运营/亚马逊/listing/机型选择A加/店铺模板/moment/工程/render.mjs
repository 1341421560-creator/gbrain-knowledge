// 将自包含矢量稿渲染为独立 PNG，不改变原稿。
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const sharp=require(process.argv[2]||'sharp');
const source=path.resolve(process.argv[3]);
const target=path.resolve(process.argv[4]);
await fs.mkdir(target,{recursive:true});
for(const name of (await fs.readdir(source)).filter(item=>item.endsWith('.svg'))){
  const output=path.join(target,name.replace(/\.svg$/,'.png'));
  await sharp(await fs.readFile(path.join(source,name))).flatten({background:'#FFFFFF'}).png({compressionLevel:9}).toFile(output);
  const meta=await sharp(output).metadata();
  process.stdout.write(JSON.stringify({file:path.basename(output),width:meta.width,height:meta.height,bytes:(await fs.stat(output)).size})+'\n');
}
