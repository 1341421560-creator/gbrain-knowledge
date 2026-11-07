import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {buildPage} from './页面拼版.mjs';
import {createTextMeasurer} from './文字测量.mjs';

export async function exportJpg(config,assets,sharp,output,selected){
 const records=[],measure=createTextMeasurer(sharp),formats={premium:'高级A加',standard:'普通A加',mobile:'移动端'};
 for(const group of config.groups.filter(g=>!selected||g.id===selected))for(const[format,category]of Object.entries(formats)){
  const p=config.floating[format],metrics={label:await measure('Model Name',p.row.modelLabelFont,500),value:await measure(group.display,p.row.modelValueFont,600),iconCrop:config.iconCrops[group.ui]};
  const page=buildPage(config,group,format,assets,metrics),layout=page.layout;
  for(const box of page.tutorial.focus)if(box.x<layout.divider.x||box.y<35||box.x+box.width>layout.width||box.y+box.height>layout.height)throw new Error('浮层区域越界 '+group.id+' '+format);
  const file=category+'/'+group.id+'_'+category+'_'+layout.width+'x'+layout.height+'_统一浮层版.jpg';
  const bytes=await sharp(Buffer.from(page.svg),{limitInputPixels:false}).flatten({background:'white'}).png().toBuffer();
  const jpg=await sharp(bytes).jpeg({quality:96,chromaSubsampling:'4:4:4'}).toBuffer(),meta=await sharp(jpg).metadata();
  if(meta.width!==layout.width||meta.height!==layout.height)throw new Error('导出尺寸错误');
  await fs.mkdir(path.dirname(path.join(output,file)),{recursive:true});await fs.writeFile(path.join(output,file),jpg);
  records.push({model:group.display,format,file,width:meta.width,height:meta.height,bytes:jpg.length,sha256:crypto.createHash('sha256').update(jpg).digest('hex'),focus:page.tutorial.focus,callout:page.tutorial.callout});
  console.log(file+' 完成');
 }
 await fs.mkdir(output,{recursive:true});await fs.writeFile(path.join(output,'复现核对.json'),JSON.stringify({owner:'JHWVVTF',revision:'原生iOS浮层_20261103',count:records.length,records},null,2),'utf8');return records;
}
