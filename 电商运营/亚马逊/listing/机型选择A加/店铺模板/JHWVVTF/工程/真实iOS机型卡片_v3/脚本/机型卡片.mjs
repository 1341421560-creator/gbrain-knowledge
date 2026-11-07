import {roundedRect as rect,textLine as text} from '../../../../../通用流程/脚本/SVG基础.mjs';

export function normalizeLayout(config,group,id){
 const paired=config.models.find(m=>m.id===group.target).members.length>1;
 if(!paired){const single=structuredClone(config.singles.find(l=>l.id===id));single.pxPerMm=config.geometry.pxPerMm;return single;}
 const l=structuredClone(config.merged.find(l=>l.id===id)),t=l.incompatibleText;
 l.header={left:{...l.leftHeading,size:l.leftHeading.font},right:{...l.rightHeading,size:l.rightHeading.font}};
 l.divider={x:l.divider.x,y1:l.divider.top,y2:l.divider.bottom};
 l.cards=[{...l.compatible},...l.incompatible.map(c=>({...c,pill:{x:c.textX,y:c.y+t.pillOffsetY,width:t.pillWidth,height:t.pillHeight,font:t.pillFont},text:{x:c.textX,y:c.y+t.singleOffsetY,font:t.font,lineHeight:t.lineHeight,sizeY:c.y+t.singleSizeOffsetY,sizeFont:t.sizeFont}}))];
 l.paired=true;l.pxPerMm=config.geometry.pxPerMm;return l;
}
export function caption(model,card,layout,index){
 const t=card.text,paired=model.members.length>1;
 let lines,font=t.font,lineHeight=t.lineHeight,y=t.y,sizeY=t.sizeY,anchor=t.anchor||'start';
 if(layout.paired){
  if(index===0){lines=model.members.map(n=>'for '+n);}
  else if(layout.id==='mobile'){lines=['for iPhone',model.name.replace('iPhone ','')];font=9.8;lineHeight=14;}
  else{lines=['for '+model.name];font=layout.id==='premium'?14:12.1;if(model.name.length>17){lines=['for iPhone',model.name.replace('iPhone ','')];}}
 }else if(layout.id==='premium'){
  if(paired){lines=model.members.map(n=>'for '+n);font=15;}
  else{lines=['for '+model.name];if(model.name.includes(' Pro'))lines=['for '+model.name.split(' Pro')[0],model.name.includes('Max')?'Pro Max':'Pro'];else if(model.name.includes(' mini'))lines=['for '+model.name.replace(' mini',''),'mini'];}
  sizeY=y+(lines.length-1)*lineHeight+31;
 }else if(layout.id==='standard'){
  if(paired){lines=model.members.map(n=>'for '+n);font=11.6;lineHeight=22;}
  else lines=['for iPhone',model.name.replace('iPhone ','')];
  sizeY=y+(lines.length-1)*lineHeight+28;
 }else{
  if(paired){lines=model.members.map(n=>'for '+n);font=10.6;lineHeight=13;y-=5;sizeY=card.y+card.height-6;}
  else{lines=['for '+model.name];font=model.name.length>16?11.6:13.5;}
 }
 return{lines,font,lineHeight,x:t.x,y,sizeY,sizeFont:t.sizeFont,anchor};
}
export function phoneDefs(models,assets){return models.map(m=>{const c=m.crop,a=assets[m.source];return '<clipPath id="phone-crop-'+m.id+'">'+rect(0,0,c.width,c.height,c.radius||0,'white')+'</clipPath><symbol id="phone-'+m.id+'" viewBox="0 0 '+c.width+' '+c.height+'"><g clip-path="url(#phone-crop-'+m.id+')"><image href="'+a.dataUri+'" x="'+(-c.x)+'" y="'+(-c.y)+'" width="'+a.width+'" height="'+a.height+'"/></g></symbol>';}).join('');}
export function placePhone(model,card,layout){
 const factor=layout.pxPerMm*layout.scale,w=model.widthMm*factor,h=model.heightMm*factor;
 const x=card.phoneCenterX-w/2,y=card.baseline-h,c=model.crop;
 const relative=model.markRegion?{x:(model.markRegion.x-c.x)/c.width,y:(model.markRegion.y-c.y)/c.height,r:model.markRegion.radius/c.width}:{x:.5,y:.5,r:.35};
 return{x,y,width:w,height:h,baseline:card.baseline,badge:{x:x+w*relative.x,y:y+h*relative.y,r:w*Math.max(.35,relative.r)}};
}
export function renderCards(models,layout,style,copy){
 const checks=[],svg=models.map((model,i)=>{
  const card=layout.cards[i],p=placePhone(model,card,layout),b=p.badge,t=caption(model,card,layout,i),pill=card.pill,yes=i===0;
  checks.push({model:model.id,members:model.members,compatible:yes,inch:model.inch,bodyMm:[model.widthMm,model.heightMm],placement:p,card,caption:t});
  const path=yes?'M-0.44,0.02 L-0.12,0.34 L0.48,-0.34':'M-0.31,-0.31 L0.31,0.31 M0.31,-0.31 L-0.31,0.31';
  return '<g data-model="'+model.id+'" data-compatible="'+yes+'">'+rect(card.x,card.y,card.width,card.height,card.radius||layout.cardRadius||18,yes?'url(#green-card)':'url(#neutral-card)',yes?style.greenBorder:style.cardBorder)+'<use href="#phone-'+model.id+'" x="'+p.x+'" y="'+p.y+'" width="'+p.width+'" height="'+p.height+'"/><g transform="translate('+b.x+' '+b.y+')"><circle r="'+b.r+'" fill="url(#'+(yes?'badge-green':'badge-red')+')"/><path d="'+path+'" transform="scale('+b.r+')" fill="none" stroke="white" stroke-width=".21" stroke-linecap="round" stroke-linejoin="round"/></g>'+rect(pill.x,pill.y,pill.width,pill.height,pill.height/2,yes?style.greenPill:style.redPill)+text(yes?copy.compatible:copy.incompatible,pill.x+pill.width/2,pill.y+pill.height*.69,pill.font,yes?style.green:style.red,700,'middle')+t.lines.map((s,j)=>text(s,t.x,t.y+j*t.lineHeight,t.font,style.navy,700,t.anchor)).join('')+text(model.inch+copy.displaySuffix,t.x,t.sizeY,t.sizeFont,style.subtext,400,t.anchor)+'</g>';
 }).join('');
 return{svg,checks};
}
