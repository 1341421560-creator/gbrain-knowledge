import fs from 'node:fs/promises';
import path from 'node:path';

export async function loadAssets(root,config,sharp){
 const paths=new Set([...config.models.map(m=>m.source),...Object.values(config.ui).flatMap(u=>Object.values(u.assets))]);
 const entries=await Promise.all([...paths].map(async p=>{const buffer=await fs.readFile(path.join(root,p)),m=await sharp(buffer).metadata();return[p,{width:m.width,height:m.height,dataUri:'data:image/'+(m.format==='jpeg'?'jpeg':'png')+';base64,'+buffer.toString('base64')}];}));
 return Object.fromEntries(entries);
}
