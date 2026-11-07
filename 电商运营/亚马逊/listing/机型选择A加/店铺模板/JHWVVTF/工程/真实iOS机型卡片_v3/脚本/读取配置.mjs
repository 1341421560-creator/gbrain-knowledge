import fs from 'node:fs/promises';
import path from 'node:path';

export async function readConfiguration(root){
 const read=async p=>JSON.parse(await fs.readFile(path.resolve(root,p),'utf8'));
 const p=await read('配置/项目.json');
 const [physical,bodies,uiData,groups,sample,singles,focus,geometry]=await Promise.all([p.physicalModels,p.bodyIndex,p.uiIndex,p.groups,p.style,p.singleLayouts,p.focus,p.geometry].map(read));
 const bodyBase=path.dirname(path.resolve(root,p.bodyIndex)),uiBase=path.dirname(path.resolve(root,p.uiIndex));
 const relative=(base,value)=>path.relative(root,path.resolve(base,value)).replaceAll('\\','/');
 const models=physical.map(m=>({id:m.id,name:m.name,members:[m.name],inch:m.inch,heightMm:m.height_mm,widthMm:m.width_mm,source:relative(bodyBase,bodies[m.source].path),crop:m.crop,markRegion:m.markRegion}));
 for(const [id,d] of Object.entries(groups.definitions)){const model=models.find(m=>m.id===d.representativeModelId);if(!model)throw new Error('缺少代表机型：'+id);models.push({...model,id,name:d.members.join('、'),members:d.members});}
 const ui={};
 for(const [id,d] of Object.entries(uiData.devices))ui[id]={...d,assets:Object.fromEntries(Object.entries(d.assets).map(([role,key])=>[role,relative(uiBase,uiData.assets[key].path)]))};
 const merged=await Promise.all(p.mergedLayouts.map(read));
 return{sample,models,groups:groups.groups,singles,merged,ui,focus,geometry};
}
