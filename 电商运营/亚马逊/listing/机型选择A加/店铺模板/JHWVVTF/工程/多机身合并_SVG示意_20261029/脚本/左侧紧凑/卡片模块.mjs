import {rect,text,pill} from '../../../../../../通用流程/脚本/SVG示意教程/SVG基础.mjs';
import {phoneArtwork} from './机身模块.mjs';
import {modelName} from '../../../../../../通用流程/脚本/SVG示意工程读取.mjs';

// 兼容区每台代表手机配自己的下方标签，牌面只保留一枚兼容胶囊。
export function compatibilityArtwork(project,g,l,placements){
  const s=project.style,c=l.compatible,labels=[],p=l.green.pill;
  let svg=rect(c.x,c.y,c.width,c.height,c.radius,'url(#green-panel)',s.greenBorder,1)+pill('Compatible',p.x,p.y,p.width,p.height,s.greenPill,s.green,p.font);
  const positives=placements.filter(p=>p.positive),inches=[...new Set(positives.map(p=>p.inch.toFixed(1)))];
  if(inches.length!==1)throw Error('此版绿色区屏幕尺寸需逐机标注，不能共用一个尺寸值。');
  svg+=text(inches[0]+'-inch display',l.green.size.x,l.green.size.y,l.green.size.font,s.green,600,'end');
  positives.forEach(ph=>{
    svg+=phoneArtwork(ph);
    const compact=positives.length>2;
    for(const d of [{text:'for iPhone',y:l.green.prefixY,font:compact?l.green.compactPrefixFont:l.green.prefixFont},{text:ph.title,y:l.green.titleY,font:compact?l.green.compactTitleFont:l.green.titleFont}]){
      const label={...d,x:ph.center,width:ph.slotWidth-10,weight:700,anchor:'middle',owner:'green',ids:ph.ids};
      labels.push(label);svg+=text(label.text,label.x,label.y,label.font,s.navy,700,'middle');
    }
  });
  placements.filter(p=>!p.positive).forEach((ph,i)=>{
    const c=ph.card,cfg=l.incompatibleText;
    svg+=rect(c.x,c.y,c.width,c.height,c.radius,'url(#red-panel)',s.border,1)+phoneArtwork(ph)+pill('Not compatible',c.textX,c.y+cfg.pillOffsetY,cfg.pillWidth,cfg.pillHeight,s.redPill,s.red,cfg.pillFont);
    ['for iPhone',modelName(project,ph.id).replace(/^iPhone /,'')].forEach((value,j)=>{
      const d={text:value,x:c.textX,y:c.y+cfg.textOffsetY+j*cfg.lineHeight,font:cfg.font,width:c.x+c.width-7-c.textX,weight:700,owner:'red-'+i,id:ph.id};
      labels.push(d);svg+=text(d.text,d.x,d.y,d.font,s.navy,700);
    });
    const d={text:ph.inch.toFixed(1)+'-inch display',x:c.textX,y:c.y+cfg.sizeOffsetY,font:cfg.sizeFont,width:c.x+c.width-7-c.textX,weight:400,owner:'red-size-'+i};
    labels.push(d);svg+=text(d.text,d.x,d.y,d.font,s.muted);
  });
  return {svg,labels};
}
