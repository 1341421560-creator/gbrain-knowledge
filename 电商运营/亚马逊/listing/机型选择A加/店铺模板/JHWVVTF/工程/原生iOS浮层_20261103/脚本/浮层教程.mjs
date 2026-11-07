import {roundedRect as rect,textLine as text,xml,gradient} from '../../../../../通用流程/脚本/SVG基础.mjs';
import {sourceDefinitions,nativeViewport,sourceCrop} from './原生界面.mjs';

const labels=['Settings','General','About','Model Name'];
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));

function stepLabel(i,x,y,font,style){
 const r=font*.96;
 return '<circle cx="'+(x+r)+'" cy="'+(y-font*.31)+'" r="'+r+'" fill="#D5F7EE"/>'+text('0'+(i+1),x+r,y+font*.06,font*.9,style.navy,700,'middle')+text(labels[i],x+r*2+10,y+font*.12,font,style.navy,700);
}

function panelWindow(screen,box,option){
 const t=screen.target,c=screen.crop,home=screen.asset==='home',width=home?option.homeSourceWidth:option.sourceWidth,height=width*box.height/box.width;
 return{x:home?Math.max(0,c.width-width):c.width*.045,y:clamp(t.y+t.height/2-height/2,0,c.height-height),width,height};
}

function chevron(x,y){return '<path d="M'+(x-3)+' '+(y-5)+'l5 5-5 5" fill="none" stroke="#ADB3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';}

function floatingTarget(index,ui,placement,layout,options,metrics,name){
 const t=ui.screens[index].target,d=placement.box,window=placement.window;
 const factor=d.width/window.width,centerY=d.y+(t.y+t.height/2-window.y)*factor;
 const color=options.outline.color,stroke=options.outline.width;
 if(index===0){
  const p=options.settings,centerX=d.x+(t.x+t.width/2-window.x)*factor;
  const x=clamp(centerX-p.width/2,d.x+3,d.x+d.width-p.width-3);
  const y=layout.id==='premium'?centerY-p.height/2:clamp(centerY-p.height/2,d.y-p.overflow,d.y+d.height+p.overflow-p.height);
  const iconBox={x:x+(p.width-p.iconSize)/2,y:y+p.iconTop,width:p.iconSize,height:p.iconSize};
  return {svg:rect(x,y,p.width,p.height,12,'white',color,stroke)+sourceCrop(0,ui,metrics.iconCrop,iconBox)+text('Settings',x+p.width/2,y+p.height-p.labelBottom,p.labelFont,'#111111',600,'middle'),box:{target:'Settings',x,y,width:p.width,height:p.height}};
 }
 const p=options.row,split=index===3&&(metrics.label+metrics.value+32>p.width),height=split?p.modelSplitHeight:p.height;
 const x=d.x+d.width/2-p.width/2,y=layout.id==='premium'?centerY-height/2:clamp(centerY-height/2,d.y,d.y+d.height-height);
 let svg=rect(x,y,p.width,height,10,'white',color,stroke);
 if(index===1){
  const c=ui.screens[1].crop,region={x:c.width*.077,y:t.y+t.height*.13,width:t.height*.74,height:t.height*.74};
  svg+=sourceCrop(1,ui,region,{x:x+11,y:y+(height-p.iconSize)/2,width:p.iconSize,height:p.iconSize})+text('General',x+46,y+height/2+6,p.generalFont,'#111111',500)+chevron(x+p.width-15,y+height/2);
 }else if(index===2){
  svg+=text('About',x+14,y+height/2+6,p.aboutFont,'#111111',500)+chevron(x+p.width-15,y+height/2);
 }else if(split){
  svg+=text('Model Name',x+p.width/2,y+18,p.modelLabelFont,'#111111',500,'middle')+text(name,x+p.width/2,y+height-10,p.modelValueFont,'#111111',600,'middle');
 }else{
  svg+=text('Model Name',x+10,y+height/2+5,p.modelLabelFont,'#111111',500)+text(name,x+p.width-10,y+height/2+5,p.modelValueFont,'#111111',600,'end');
 }
 return{svg,box:{target:labels[index],x,y,width:p.width,height,splitModelName:split}};
}

function modelCallout(layout,name,style){
 const b=layout.id==='premium'?{x:1228,y:420,width:228,height:64,labelFont:14,valueFont:18.5,labelY:440,valueY:465}:layout.id==='standard'?{x:721,y:529,width:236,height:58,labelFont:12,valueFont:17,labelY:547,valueY:571}:{x:318,y:413,width:270,height:32,labelFont:9,valueFont:13.8,labelY:424,valueY:439};
 return{svg:rect(b.x,b.y,b.width,b.height,layout.id==='mobile'?14:22,'white',style.green,1.4)+text('Model Name:',b.x+b.width/2,b.labelY,b.labelFont,style.navy,700,'middle')+text(name,b.x+b.width/2,b.valueY,b.valueFont,style.green,700,'middle'),box:b};
}

export function renderTutorial(config,group,layout,assets,metrics){
 const ui=config.ui[group.ui],style=config.sample.style,p=config.options.premium,blur=config.options.blur[layout.id],placements=[];
 const defs=sourceDefinitions(ui,assets,null);
 let svg='';
 if(layout.id==='premium'){
  p.positions.forEach((x,i)=>{
   const f=ui.frame,k=p.phoneWidth/f.width,d={x:x+f.display.x*k,y:p.top+f.display.y*k,width:f.display.width*k,height:f.display.height*k},screen=ui.screens[i],home=assets[ui.assets.home];
   svg+=stepLabel(i,x+5,p.labelY,p.labelFont,style)+'<use href="#phone-frame" x="'+x+'" y="'+p.top+'" width="'+p.phoneWidth+'" height="'+(f.height*k)+'"/>';
   svg+='<defs><mask id="hardware-'+i+'" maskUnits="userSpaceOnUse" x="'+d.x+'" y="'+d.y+'" width="'+d.width+'" height="'+d.height+'"><use href="#native-home" transform="translate('+d.x+' '+d.y+') scale('+(d.width/home.width)+' '+(d.height/home.height)+')" filter="url(#alpha-white)"/></mask></defs><g mask="url(#hardware-'+i+')">'+nativeViewport(ui,i,d,{x:0,y:0,width:screen.crop.width,height:screen.crop.height},blur,'none')+'</g>';
   if(i<3)svg+='<path d="M'+(x+194)+' 326h15m-6-6 6 6-6 6" fill="none" stroke="'+style.green+'" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>';
   placements.push({step:i+1,box:d,window:{x:0,y:0,width:screen.crop.width,height:screen.crop.height}});
  });
 }else{
  const option=config.options[layout.id];
  option.boxes.forEach((b,i)=>{
   const win=panelWindow(ui.screens[i],b,option),r=layout.id==='mobile'?8:13;
   svg+=stepLabel(i,b.x,b.y-(layout.id==='mobile'?10:18),option.labelFont,style)+'<defs><clipPath id="panel-'+i+'">'+rect(b.x,b.y,b.width,b.height,r,'white')+'</clipPath></defs>'+rect(b.x,b.y,b.width,b.height,r,'#F6F6F8','#DADDE2',.8)+'<g clip-path="url(#panel-'+i+')">'+nativeViewport(ui,i,b,win,blur,'none')+'</g>';
   if(layout.id==='standard'&&(i===0||i===2))svg+='<path d="M'+(b.x+b.width+4)+' '+(b.y+88)+'h14m-5-5 5 5-5 5" fill="none" stroke="'+style.green+'" stroke-width="2.5" stroke-linecap="round"/>';
   if(layout.id==='mobile'&&i<3)svg+='<path d="M446 '+(b.y+b.height+3)+'v12m-4-4 4 4 4-4" fill="none" stroke="'+style.green+'" stroke-width="2" stroke-linecap="round"/>';
   placements.push({step:i+1,box:b,window:win});
  });
 }
 const focus=placements.map((item,i)=>floatingTarget(i,ui,item,layout,config.floating[layout.id],metrics,group.display));
 svg+=focus.map(f=>'<g data-floating-target="'+f.box.target+'">'+f.svg+'</g>').join('');
 const callout=modelCallout(layout,group.display,style);svg+=callout.svg;
 return{defs,svg,placements,focus:focus.map(f=>f.box),callout:callout.box,blur,annotation:'真实iOS底图与放大提示浮层；沿用户参考图将重点标签覆盖在对应操作位置。'};
}
