import {rect,text,pill} from '../../../../../../通用流程/脚本/SVG示意教程/SVG基础.mjs';
import {phoneArtwork} from './机身绘制.mjs';

export function compatibilityArtwork(project,group,placements) {
  const l=project.layout,s=l.style,g=l.green;
  const green=placements.filter(p=>p.positive);
  const sizes=[...new Set(green.map(p=>p.inch.toFixed(1)))];
  let out=rect(g.x,g.y,g.width,g.height,g.radius,'url(#green-panel)',s.greenBorder,1)+pill('Compatible',34,134,142,29,s.greenPill,s.green,17);
  if(sizes.length===1) out+=text(sizes[0]+'-inch display',548,154,16,s.green,600,'end');
  out+=green.map(p=>phoneArtwork(p)+text('for iPhone',p.center,l.greenPrefixY,16,s.navy,600,'middle')+text(p.title,p.center,l.greenTitleY,18,s.navy,700,'middle')+(p.generation?text(p.generation,p.center,l.generationY,10,s.muted,400,'middle'):'')).join('');
  placements.filter(p=>!p.positive).forEach((p,i)=>{
    const r=l.red[i],tx=r.x+115;
    out+=rect(r.x,r.y,r.width,r.height,r.radius,'url(#red-panel)',s.border,1)+phoneArtwork(p)+pill('Not compatible',tx,r.y+19,143,30,s.redPill,s.red,16)+text('for iPhone',tx,r.y+76,16,s.navy,600);
    out+=p.lines.map((line,j)=>text(line,tx,r.y+100+j*21,17,s.navy,700)).join('');
    out+=text(p.inch.toFixed(1)+'-inch display',tx,r.y+163,13.5,s.muted);
  });
  return out;
}
