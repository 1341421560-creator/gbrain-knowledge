import {roundedRect as rect,textLine as text,xml,gradient} from '../../../../../通用流程/脚本/SVG基础.mjs';
import {caption,placePhone} from '../../真实iOS机型卡片_v3/脚本/机型卡片.mjs';

export function renderCards(models,layout,style,copy){
 const checks=[],svg=models.map((model,i)=>{
  const card=layout.cards[i],p=placePhone(model,card,layout),b=p.badge,t=caption(model,card,layout,i),pill=card.pill,yes=i===0;
  // 高级版的 Plus 与 Pro 一样拆成两行，保持字号和文字边界一致。
  if(layout.id==='premium'&&model.members.length===1&&model.name.endsWith(' Plus')){
   t.lines=['for '+model.name.replace(' Plus',''),'Plus'];t.sizeY=t.y+t.lineHeight+31;
  }
  checks.push({model:model.id,members:model.members,compatible:yes,inch:model.inch,bodyMm:[model.widthMm,model.heightMm],placement:p,card,caption:t});
  const badgePath=yes?'M-0.44,0.02 L-0.12,0.34 L0.48,-0.34':'M-0.31,-0.31 L0.31,0.31 M0.31,-0.31 L-0.31,0.31';
  return '<g data-model="'+model.id+'" data-compatible="'+yes+'">'+rect(card.x,card.y,card.width,card.height,card.radius||layout.cardRadius||18,yes?'url(#green-card)':'url(#neutral-card)',yes?style.greenBorder:style.cardBorder)+'<use href="#phone-'+model.id+'" x="'+p.x+'" y="'+p.y+'" width="'+p.width+'" height="'+p.height+'"/><g transform="translate('+b.x+' '+b.y+')"><circle r="'+b.r+'" fill="url(#'+(yes?'badge-green':'badge-red')+')"/><path d="'+badgePath+'" transform="scale('+b.r+')" fill="none" stroke="white" stroke-width=".21" stroke-linecap="round" stroke-linejoin="round"/></g>'+rect(pill.x,pill.y,pill.width,pill.height,pill.height/2,yes?style.greenPill:style.redPill)+text(yes?copy.compatible:copy.incompatible,pill.x+pill.width/2,pill.y+pill.height*.69,pill.font,yes?style.green:style.red,700,'middle')+t.lines.map((s,j)=>text(s,t.x,t.y+j*t.lineHeight,t.font,style.navy,700,t.anchor)).join('')+text(model.inch+copy.displaySuffix,t.x,t.sizeY,t.sizeFont,style.subtext,400,t.anchor)+'</g>';
 }).join('');return{svg,checks};
}
