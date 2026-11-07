import fs from 'node:fs/promises';
import path from 'node:path';

export async function readConfiguration(root){
 const read=async value=>JSON.parse(await fs.readFile(path.resolve(root,value),'utf8'));
 const project=await read('配置/项目.json');
 const keys=['physicalModels','bodyIndex','bodyMapping','uiIndex','sharedCompatibility','groups','style','singleLayouts','tutorial','floating','treatments','geometry'];
 const [physical,bodies,mapping,uiData,shared,targets,sample,singles,options,floating,treatments,geometry]=await Promise.all(keys.map(key=>read(project[key])));
 const relative=(base,value)=>path.relative(root,path.resolve(base,value)).replaceAll('\\','/'),bodyBase=path.dirname(path.resolve(root,project.bodyIndex)),uiBase=path.dirname(path.resolve(root,project.uiIndex));
 const models=project.physicalIds.map(id=>{
  const m=physical.find(v=>v.id===id),body=bodies[mapping[id].source],crop=body.body_crop;
  if(!m||!body)throw new Error('通用型号或机身资料缺失 '+id);
  return{id,name:m.name,members:[m.name],inch:m.inch,heightMm:m.height_mm,widthMm:m.width_mm,source:relative(bodyBase,body.path),crop,markRegion:{x:crop.width*.5,y:crop.height*.55,radius:crop.width*.36}};
 });
 for(const[id,groupId]of Object.entries(targets.comparisonAliases)){
  const model=models.find(m=>m.id===id),definition=shared.definitions[groupId];
  if(!model||!definition)throw new Error('兼容组引用失效 '+groupId);
  model.members=definition.members;model.name=definition.members.join('、');
 }
 const ui={},iconCrops={};
 for(const[id,source]of Object.entries(uiData.devices)){
  const treatment=treatments[id];if(!treatment)throw new Error('界面处理坐标缺失 '+id);
  ui[id]={...source,assets:Object.fromEntries(Object.entries(source.assets).map(([role,key])=>[role,relative(uiBase,uiData.assets[key].path)])),screens:source.screens.map(s=>({...s,logoMasks:treatment.screens.find(t=>t.asset===s.asset)?.logoMasks||[]}))};
  iconCrops[id]=treatment.iconCrop;
 }
 // 旧底部标签参数不进入当前浮层修订，防止选错布局。
 for(const key of ['tagY','tagWidth','tagHeight','tagFont'])delete options.premium[key];
 options.note='对应机型的原生iOS截图作底图；四个重点通过清晰浮层呈现，无底部标签排和引线。';
 return{sample,singles,models,groups:targets.groups,ui,options,floating,iconCrops,geometry};
}
