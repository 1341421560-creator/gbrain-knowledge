import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {buildPage} from './页面拼版.mjs';

export async function exportJpg(config,assets,sharp,outputRoot,selectedGroup){
 const records=[];
 const groups=selectedGroup?config.groups.filter(g=>g.id===selectedGroup):config.groups;
 if(!groups.length)throw new Error('未找到目标组');
 for(const group of groups)for(const id of ['premium','standard','mobile']){
  const page=buildPage(config,group,id,assets),l=page.layout,name={premium:'高级A加',standard:'普通A加',mobile:'移动端'}[id];
  for(const c of page.cards){const a=c.placement,b=c.card;if(a.x<b.x-1||a.y<b.y-1||a.x+a.width>b.x+b.width+1||a.y+a.height>b.y+b.height+1)throw new Error('机身越界：'+c.model);}
  const directory=path.join(outputRoot,name);await fs.mkdir(directory,{recursive:true});
  const file=path.join(directory,group.id+'_'+name+'_'+l.width+'x'+l.height+'_重点虚化v3.jpg');
  const buffer=await sharp(Buffer.from(page.svg),{limitInputPixels:false}).flatten({background:'white'}).jpeg({quality:96,chromaSubsampling:'4:4:4'}).toBuffer();
  const metadata=await sharp(buffer).metadata();if(metadata.width!==l.width||metadata.height!==l.height)throw new Error('画布尺寸错误');
  await fs.writeFile(file,buffer);
  records.push({group:group.id,format:id,file:path.relative(outputRoot,file).replaceAll('\\','/'),width:l.width,height:l.height,sha256:crypto.createHash('sha256').update(buffer).digest('hex'),blur:page.tutorial.blur,publicationStatus:'截图禁词仍需复核'});
  console.log(group.id+' '+name+' 完成');
 }
 await fs.writeFile(path.join(outputRoot,'复现核对.json'),JSON.stringify(records,null,2),'utf8');
 return records;
}
