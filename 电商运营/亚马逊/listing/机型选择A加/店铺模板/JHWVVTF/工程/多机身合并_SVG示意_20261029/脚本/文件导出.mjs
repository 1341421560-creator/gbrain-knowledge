import fs from 'node:fs/promises';
import path from 'node:path';

export async function exportArtwork(project,a){
  const l=a.layout,folder=({premium:'高级A加',standard:'普通A加',mobile:'移动端'})[a.variant];
  const dir='成品/'+a.group.id+'/'+folder;
  await fs.mkdir(path.join(project.root,dir),{recursive:true});
  const stem=a.group.stem+'_v3_真实机型教程_'+folder+'_'+l.width+'x'+l.height;
  const files=Object.fromEntries(['png','jpg','svg'].map(ext=>[ext,dir+'/'+stem+'.'+ext]));
  await fs.writeFile(path.join(project.root,files.svg),a.svg,'utf8');
  const raw=await project.sharp(Buffer.from(a.svg),{limitInputPixels:false}).flatten({background:'#FFFFFF'}).removeAlpha().raw().toBuffer();
  const image=()=>project.sharp(raw,{raw:{width:l.width,height:l.height,channels:3}});
  await image().png({compressionLevel:9}).toFile(path.join(project.root,files.png));
  await image().jpeg({quality:96,chromaSubsampling:'4:4:4'}).toFile(path.join(project.root,files.jpg));
  return {...a,files,stem};
}
