import {rect,text} from './SVG基础.mjs';
import {uiDefinitions} from './原生界面.mjs';
import {renderDevice} from './教程机身.mjs';
import {renderStrip} from './移动界面条带.mjs';
import {modelName} from '../SVG示意工程读取.mjs';

export const tutorialDefinitions=project=>uiDefinitions(project.tutorial);

function fullListCallout(project,g,v){
  const c=project.typography[v].calloutPresets[g.memberIds.length];
  const rows=Math.ceil(g.memberIds.length/c.columns),cw=c.width/c.columns;
  let svg=rect(c.x,c.y,c.width,c.height,v==='mobile'?15:22,'#FFFFFF','#087513',1.1)+text(g.memberIds.length===1?'Model Name:':'Compatible models:',c.x+c.width/2,c.labelY,c.labelFont,'#070D2B',700,'middle');
  const labels=[];
  g.memberIds.forEach((id,i)=>{
    const d={text:modelName(project,id),x:c.x+cw*(Math.floor(i/rows)+.5),y:c.valueY+(i%rows)*c.lineHeight,font:c.valueFont,width:cw-8,owner:'callout',id,anchor:'middle',weight:700};
    labels.push(d);svg+=text(d.text,d.x,d.y,d.font,'#087513',700,'middle');
  });
  return {svg,labels,box:c};
}

export function tutorialArtwork(project,g,variant){
  const t=project.tutorial,spec=t.examples[g.id],m=project.models.get(spec.model),profile={...spec,name:modelName(project,spec.model),body:m.body_mm};
  const slots=[],devices=[],labels=[];
  let svg='';
  if(variant==='mobile'){
    const l=t.mobile;
    for(let i=0;i<4;i++){
      svg+='<circle cx="'+l.headingX+'" cy="'+l.headingY[i]+'" r="12" fill="#D1F5E9"/>'+text(String(i+1).padStart(2,'0'),l.headingX,l.headingY[i]+4.5,12,'#070D2B',700,'middle')+text(t.steps[i],344,l.headingY[i]+5,l.labelFont,'#070D2B',700);
      const d=renderStrip(profile,i,l);devices.push(d);svg+=d.svg;
      if(i<3){const y=[128,224,319][i];svg+='<path d="M447 '+(y-5)+'v10m-4-4 4 4 4-4" stroke="#087513" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';}
    }
    const c=fullListCallout(project,g,variant);svg+=c.svg;labels.push(...c.labels);
  }else{
    const l=t[variant];
    for(let i=0;i<4;i++){
      const bodyW=t.body_height*m.body_mm.width/m.body_mm.height;
      const scale=variant==='premium'?1:l.width/bodyW;
      const x=l.phoneX[i],y=variant==='premium'?l.phoneY:l.phoneY[i],hy=variant==='premium'?l.headingY:l.headingY[i],cx=x+(variant==='premium'?22:17);
      svg+='<circle cx="'+cx+'" cy="'+hy+'" r="'+l.circleR+'" fill="#D1F5E9"/>'+text(String(i+1).padStart(2,'0'),cx,hy+(variant==='premium'?8:6),variant==='premium'?20:17,'#070D2B',700,'middle')+text(t.steps[i],x+(variant==='premium'?58:50),hy+(variant==='premium'?10:7),l.labelFont,'#070D2B',700);
      const d=renderDevice(profile,i,{x,y,scale,focused:variant==='standard'&&i===3,id:variant+'-'+i});
      if(variant==='standard'){
        const clip={x:x-2,y:y-2,width:l.width+4,height:l.clipHeight[i]+2},id='device-view-'+i;
        svg+='<clipPath id="'+id+'"><rect x="'+clip.x+'" y="'+clip.y+'" width="'+clip.width+'" height="'+clip.height+'"/></clipPath><g clip-path="url(#'+id+')">'+d.svg+'</g>';
        d.clip=clip;
      }else svg+=d.svg;
      devices.push(d);
    }
    if(variant==='premium'){
      for(const x of l.phoneX.slice(0,3))svg+='<path d="M'+(x+187)+' 347h15m-6-6 6 6-6 6" stroke="#087513" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
      const c=l.callout;
      svg+=rect(c.x,c.y,c.width,c.height,25,'white','#0A8716',1.5)+text(g.memberIds.length===1?'Model Name:':'Example:',c.x+c.width/2,c.y+21,14,'#070D2B',700,'middle')+text(profile.name,c.x+c.width/2,c.y+44,profile.name.length>15?20:22,'#087513',700,'middle');
    }else{
      svg+='<path d="M708 222h12m-5-5 5 5-5 5 M708 463h12m-5-5 5 5-5 5" fill="none" stroke="#087513" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
      const c=fullListCallout(project,g,variant);svg+=c.svg;labels.push(...c.labels);
    }
  }
  return {svg,profile,devices,labels,screenValue:profile.name,os:profile.os};
}
