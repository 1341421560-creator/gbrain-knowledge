import {statusMark} from '../../../../../../通用流程/脚本/SVG示意教程/SVG基础.mjs';

// 全套使用一个毫米换算系数，照片宽高保持同倍率，所有手机完整放置。
export function placementsFor(project,group) {
  const l=project.layout;
  const centers={1:[293],2:[158,428],3:[110,293,476],4:[90,224,358,492]}[group.slots.length];
  return [...group.slots.map((s,i)=>({...s,positive:true,center:centers[i],baseline:l.greenBaseline})),...group.negative.map((s,i)=>({...s,positive:false,center:l.red[i].x+58,baseline:l.redBaseline}))].map((s,i)=>{
    const m=project.models.get(s.asset),a=project.assets.get(s.asset),c=a.crop;
    if(!m||!a) throw Error('型号或机身未配置：'+s.asset);
    const height=m.body_mm.height*project.template.reference.px_per_mm*l.scale;
    const width=height*c.width/c.height;
    const x=s.center-width/2,y=s.baseline-height;
    const historical=a.embeddedMarker;
    const badge=historical?{x:x+(a.markRegion.x-c.x)*height/c.height,y:y+(a.markRegion.y-c.y)*height/c.height,radius:a.markRegion.radius*height/c.height+1.4}:{x:s.center,y:y+height*.55,radius:s.positive?16:19};
    return {...s,index:i,model:m,x,y,width,height,badge,inch:m.display_inches};
  });
}

export function phoneDefinitions(project,placements) {
  return [...new Set(placements.map(p=>p.asset))].map(id=>{
    const a=project.assets.get(id),c=a.crop;
    return '<clipPath id="clip-'+id+'"><rect width="'+c.width+'" height="'+c.height+'" rx="'+c.radius+'"/></clipPath><symbol id="phone-'+id+'" viewBox="0 0 '+c.width+' '+c.height+'"><image href="'+a.uri+'" width="'+c.width+'" height="'+c.height+'" clip-path="url(#clip-'+id+')"/></symbol>';
  }).join('');
}

export function phoneArtwork(p) {
  return '<g data-phone="'+p.asset+'" data-compatible="'+p.positive+'"><use href="#phone-'+p.asset+'" x="'+p.x+'" y="'+p.y+'" width="'+p.width+'" height="'+p.height+'"/>'+statusMark(p.badge.x,p.badge.y,p.badge.radius,p.positive)+'</g>';
}
