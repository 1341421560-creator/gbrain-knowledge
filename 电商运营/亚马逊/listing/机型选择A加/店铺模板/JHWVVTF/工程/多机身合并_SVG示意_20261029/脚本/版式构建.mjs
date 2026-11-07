import {text,escape} from '../../../../../通用流程/脚本/SVG示意教程/SVG基础.mjs';
import {placementsFor as premiumPlaces,phoneDefinitions as premiumDefs} from './左侧高级/机身绘制.mjs';
import {compatibilityArtwork as premiumLeft} from './左侧高级/兼容区域.mjs';
import {placementsFor as compactPlaces,phoneDefinitions as compactDefs} from './左侧紧凑/机身模块.mjs';
import {compatibilityArtwork as compactLeft} from './左侧紧凑/卡片模块.mjs';
import {tutorialDefinitions,tutorialArtwork} from '../../../../../通用流程/脚本/SVG示意教程/教程构建.mjs';

export function buildArtwork(project,g,variant){
  const l=project.layouts[variant],view=g.views[variant];
  let placements,left,defs,labels=[];
  if(variant==='premium'){
    const p={...project,layout:l};
    placements=premiumPlaces(p,view);left=premiumLeft(p,view,placements);defs=premiumDefs(p,placements);
  }else{
    placements=compactPlaces(project,view,l);defs=compactDefs(project,placements);
    const c=compactLeft(project,view,l,placements);left=c.svg;labels=c.labels;
  }
  const tutorial=tutorialArtwork(project,g,variant),s=l.style||project.style;
  const gradients='<linearGradient id="green-panel"><stop stop-color="#F0FFF4"/><stop offset="1" stop-color="#EAF9EE"/></linearGradient><linearGradient id="red-panel" '+(variant==='premium'?'x1="0" y1="0" x2="1" y2="1"':'')+'><stop stop-color="#FFFFFF"/><stop offset="1" stop-color="'+(variant==='premium'?'#FFF9FA':'#FBFCFE')+'"/></linearGradient><linearGradient id="check-green"><stop stop-color="'+(variant==='premium'?'#36CB3A':'#59CD43')+'"/><stop offset="1" stop-color="'+(variant==='premium'?'#19A828':'#1BA62C')+'"/></linearGradient><linearGradient id="cross-red"><stop stop-color="'+(variant==='premium'?'#FF4646':'#FF4B3E')+'"/><stop offset="1" stop-color="'+(variant==='premium'?'#FF151C':'#FF180F')+'"/></linearGradient>';
  const headings=variant==='premium'?Object.values(l.headings).map(h=>text(h.text,h.x,h.y,h.font,s.navy,700)).join(''):text('Model compatibility',l.leftHeading.x,l.leftHeading.y,l.leftHeading.font,s.navy,700)+text('Check model using Settings',l.rightHeading.x,l.rightHeading.y,l.rightHeading.font,s.navy,700);
  const divider=variant==='premium'?'<path d="M578 69V580" stroke="#D5D8DA"/>':'<path d="M'+l.divider.x+' '+l.divider.top+'V'+l.divider.bottom+'" stroke="#D5D8DA"/>';
  const svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+l.width+'" height="'+l.height+'" viewBox="0 0 '+l.width+' '+l.height+'"><title>'+escape(g.id+' '+g.label+' · '+l.name+' · 真实机型教程修正版')+'</title><defs>'+gradients+defs+tutorialDefinitions(project)+'</defs><rect width="100%" height="100%" fill="white"/><g font-family="'+(l.font||project.style.font)+'">'+left+tutorial.svg+divider+headings+'</g></svg>';
  return {group:g,variant,layout:l,svg,placements,labels:[...labels,...tutorial.labels],tutorial};
}
