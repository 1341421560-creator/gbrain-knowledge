import {statusMark} from '../../../../../../通用流程/脚本/SVG示意教程/SVG基础.mjs';

// 同一规格全部手机使用同一真实毫米比例，不随展示数量单独放大。
export function placementsFor(project,g,l){
  const slots=g.slots.map((s,i)=>({...s,id:s.asset,positive:true,ids:s.ids,center:l.compatible.x+l.compatible.width*(i+.5)/g.slots.length,baseline:l.green.baseline,card:l.compatible,slotWidth:l.compatible.width/g.slots.length}));
  const reds=g.negative.map((id,i)=>({id,ids:[id],positive:false,center:l.incompatible[i].phoneCenterX,baseline:l.incompatible[i].baseline,card:l.incompatible[i]}));
  return [...slots,...reds].map(p=>{
    const a=project.assets.get(p.id),m=project.models.get(p.id);
    if(!a||!m)throw Error('缺少型号素材：'+p.id);
    const height=m.body_mm.height*project.template.reference.px_per_mm*l.scale,width=height*a.width/a.height;
    return {...p,x:p.center-width/2,y:p.baseline-height,width,height,inch:m.display_inches,body_mm:m.body_mm,badge:{x:p.center,y:p.baseline-height*.45,radius:l.badge[p.positive?'positive':'negative']}};
  });
}
export function phoneDefinitions(project,placements){
  return [...new Set(placements.map(p=>p.id))].map(id=>{
    const a=project.assets.get(id);
    return '<clipPath id="body-'+id+'"><rect width="'+a.width+'" height="'+a.height+'" rx="'+a.radius+'"/></clipPath><symbol id="phone-'+id+'" viewBox="0 0 '+a.width+' '+a.height+'"><image href="'+a.uri+'" width="'+a.width+'" height="'+a.height+'" clip-path="url(#body-'+id+')"/></symbol>';
  }).join('');
}
export function phoneArtwork(p){
  return '<g data-phone="'+p.id+'" data-compatible="'+p.positive+'"><use href="#phone-'+p.id+'" x="'+p.x+'" y="'+p.y+'" width="'+p.width+'" height="'+p.height+'"/>'+statusMark(p.badge.x,p.badge.y,p.badge.radius,p.positive)+'</g>';
}
