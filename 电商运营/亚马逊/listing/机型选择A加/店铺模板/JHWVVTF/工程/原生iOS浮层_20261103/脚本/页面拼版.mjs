import {roundedRect as rect,textLine as text,xml,gradient} from '../../../../../通用流程/脚本/SVG基础.mjs';
import {normalizeLayout,phoneDefs} from '../../真实iOS机型卡片_v3/脚本/机型卡片.mjs';
import {renderCards} from './机型卡片.mjs';
import {renderTutorial} from './浮层教程.mjs';

export function buildPage(config,group,format,assets,metrics){
 const layout=normalizeLayout(config,group,format),models=[group.target,...group.wrong].map(id=>config.models.find(m=>m.id===id)),s=config.sample.style,copy=config.sample.copy,d=layout.divider;
 const cards=renderCards(models,layout,s,copy),tutorial=renderTutorial(config,group,layout,assets,metrics);
 const defs=gradient('green-card','#F0FFF4','#EAF9EE')+gradient('neutral-card','#FFFFFF','#FBFCFE')+gradient('badge-green','#59CD43','#1BA62C')+gradient('badge-red','#FF4B3E','#FF180F')+phoneDefs(models,assets)+tutorial.defs;
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+layout.width+'" height="'+layout.height+'" viewBox="0 0 '+layout.width+' '+layout.height+'"><title>'+xml(group.id+' '+layout.name)+'</title><defs>'+defs+'</defs><rect width="100%" height="100%" fill="white"/><g font-family="'+s.font+'"><path d="M'+d.x+' '+d.y1+'V'+d.y2+'" stroke="#D5D8DA"/>'+cards.svg+text(copy.leftHeading,layout.header.left.x,layout.header.left.y,layout.header.left.size,s.navy,700)+text(copy.rightHeading,layout.header.right.x,layout.header.right.y,layout.header.right.size,s.navy,700)+tutorial.svg+'</g></svg>';
 return{svg,layout,models,cards:cards.checks,tutorial};
}
