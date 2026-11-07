import fs from 'node:fs/promises';
import path from 'node:path';

// 配置保存在店铺，物理事实和照片从知识库共享目录读取。
export async function readProject(dataRoot,sharp,{outputRoot}={}){
  if(!outputRoot)throw Error('请显式指定项目输出目录，禁止把批量结果写回知识库。');
  const read=async p=>JSON.parse((await fs.readFile(path.resolve(dataRoot,p),'utf8')).replace(/^\uFEFF/,''));
  const refs=await read('配置/资料引用.json');
  const [layouts,catalog,template,bindings,index,list,typography,tutorial,style]=await Promise.all(['配置/版式.json',refs.physical,refs.template,refs.rearBindings,refs.rearIndex,'配置/制作清单.json','配置/多型号排字.json','配置/教程规格.json','配置/样式.json'].map(read));
  const assets=new Map(),indexBase=path.dirname(path.resolve(dataRoot,refs.rearIndex));
  for(const [id,b]of Object.entries(bindings)){
    const a=index[b.source],image=await fs.readFile(path.resolve(indexBase,a.path));
    assets.set(id,{width:b.width,height:b.height,radius:b.radius,crop:{x:0,y:0,width:b.width,height:b.height,radius:b.radius},embeddedMarker:false,uri:'data:image/png;base64,'+image.toString('base64')});
  }
  return {root:path.resolve(outputRoot),dataRoot,sharp,layouts,models:new Map(catalog.models.map(m=>[m.id,m])),assets,template,groups:list.groups,typography,tutorial,style};
}
export function modelName(project,id){return /^iPhoneSE\d{4}$/.test(id)?'iPhone SE ('+id.slice(-4)+')':project.models.get(id).name;}
