import fs from 'node:fs/promises';
import path from 'node:path';

// 核对真实输出图层、画布、固定高度和目标可见性；历史像素一致性另由复现报告记录。
export async function auditBatch(project,arts){
  const errors=[],records=[];
  if(arts.length!==project.groups.length*3)errors.push('三端数量不完整');
  for(const a of arts){
    const t=a.tutorial,p=t.profile,m=project.models.get(p.model),issues=[];
    if(!a.group.memberIds.includes(p.model))issues.push('教程示例不在兼容组');
    if(p.frame!==m.front_type)issues.push('前屏与物理主表不符');
    const frames=[...t.svg.matchAll(/data-hardware="([^"]+)"/g)].map(m=>m[1]);
    if(a.variant==='mobile'?frames.length!==0:frames.length!==4||frames.some(f=>f!==p.frame))issues.push('前屏图层数量或类型错误');
    if(/<image\b|data-hardware="island"|\bNFC\b/.test(t.svg))issues.push('本批示意教程混入不适用内容');
    const phones=a.placements.map(ph=>{
      const id=ph.id||ph.asset,model=project.models.get(id),height=model.body_mm.height*project.template.reference.px_per_mm*a.layout.scale;
      if(Math.abs(ph.height-height)>.001)issues.push('固定高度不符：'+id);
      if(ph.x<0||ph.y<0||ph.x+ph.width>a.layout.leftBoundary||ph.y+ph.height>a.layout.height)issues.push('机身超出左侧画布：'+id);
      return {id,height:ph.height,width:ph.width};
    });
    for(const d of t.devices)if(d.clip){const q=d.selected,c=d.clip;if(q.x<c.x||q.y<c.y||q.x+q.width>c.x+c.width||q.y+q.height>c.y+c.height)issues.push('关键项被裁切');}
    if(a.variant==='standard'){const q=t.devices[3].selected,c=project.typography.standard.calloutPresets[a.group.memberIds.length];if(q.y+q.height>c.y)issues.push('型号行被提示框覆盖');}
    for(const d of a.labels){
      const meta=await project.sharp({text:{text:d.text.replaceAll('&','&amp;'),font:'Arial '+(d.weight===700?'Bold ':'')+d.font,dpi:72,rgba:true}}).metadata();
      if(meta.width>d.width+2)issues.push('文字过宽：'+d.text);
    }
    if(/(?:href|src)="(?:file:|https?:|[A-Za-z]:)/.test(a.svg))issues.push('SVG不是自包含');
    for(const ext of ['png','jpg']){const meta=await project.sharp(path.join(project.root,a.files[ext])).metadata();if(meta.width!==a.layout.width||meta.height!==a.layout.height||meta.channels!==3)issues.push(ext+'画布或通道错误');}
    records.push({group:a.group.id,variant:a.variant,example:p.model,frame:p.frame,os:p.os,width:a.layout.width,height:a.layout.height,phones,issues});errors.push(...issues.map(s=>a.group.id+'/'+a.variant+'：'+s));
  }
  await fs.mkdir(path.join(project.root,'核对'),{recursive:true});await fs.writeFile(path.join(project.root,'核对/归档成品核对.json'),JSON.stringify({passed:!errors.length,errors,records},null,2),'utf8');
  if(errors.length)throw Error(errors.join('\n'));
}
