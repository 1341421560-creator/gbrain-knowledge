import fs from 'node:fs/promises';
import path from 'node:path';

// 旧格式只作为兼容视图，物理参数从唯一主表派生，裁切信息保持原样。
export async function synchronizeViews(knowledgeRoot){
  const read=async p=>JSON.parse((await fs.readFile(path.join(knowledgeRoot,p),'utf8')).replace(/^\uFEFF/,''));
  const [physical,mappings]=await Promise.all(['通用素材/手机机身/型号与尺寸.json','通用素材/手机机身/型号数据/旧格式素材映射.json'].map(read));
  const byId=new Map(physical.models.map(m=>[m.id,m]));
  const view=mappings.map(a=>{
    const m=byId.get(a.id);if(!m)throw Error('物理主表缺少型号：'+a.id);
    return {id:m.id,name:m.name,inch:m.display_inches.toFixed(1),family:m.family,height_mm:m.body_mm.height,width_mm:m.body_mm.width,sourceUrl:m.spec_source,...a};
  });
  await fs.writeFile(path.join(knowledgeRoot,'通用素材/手机机身/型号数据/型号资料.json'),JSON.stringify(view,null,2),'utf8');
  return {physical:physical.models.length,legacy:view.length};
}

if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(import.meta.filename))console.log(await synchronizeViews(path.resolve(import.meta.dirname,'../..')));
