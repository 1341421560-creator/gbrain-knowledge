import {roundedRect as rect,textLine as text} from '../../../../../通用流程/脚本/SVG基础.mjs';

function frameGeometry(ui,x,y,w){const f=ui.frame,k=w/f.width,d=f.display;return{x,y,w,h:f.height*k,k,display:{x:x+d.x*k,y:y+d.y*k,width:d.width*k,height:d.height*k}};}
function windowFor(screen,w,h){
 const c=screen.crop,t=screen.target,sourceHeight=c.width*h/w;
 const top=screen.asset==='home'?t.y-1:t.y+t.height/2-sourceHeight/2;
 return{x:0,y:Math.max(0,Math.min(c.height-sourceHeight,top)),width:c.width,height:sourceHeight};
}
function nativeUse(s){return '<use href="#native-'+s.asset+'" x="'+(-s.crop.x)+'" y="'+(-s.crop.y)+'"/>';}
function sourceDefs(ui,assets,group){
 let result=Object.entries(ui.assets).map(([id,p])=>{const a=assets[p];return '<image id="native-'+id+'" href="'+a.dataUri+'" width="'+a.width+'" height="'+a.height+'"/>';}).join('');
 result+='<symbol id="phone-frame" viewBox="0 0 '+ui.frame.width+' '+ui.frame.height+'"><use href="#native-frame"/></symbol><filter id="screen-alpha-white" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/></filter>';
 ui.screens.forEach((s,i)=>{
  const c=s.crop,t=s.target;
  result+='<clipPath id="sharp-target-'+i+'">'+rect(t.x-2,t.y-2,t.width+4,t.height+4,0,'white')+'</clipPath><clipPath id="source-inner-'+i+'">'+rect(t.x+16,t.y+16,t.width-32,t.height-32,0,'white')+'</clipPath>';
  let content=nativeUse(s);
  if(s.originalAnnotation)content+=rect(t.x-7,t.y-7,t.width+14,t.height+14,0,'white')+'<g clip-path="url(#source-inner-'+i+')">'+nativeUse(s)+'</g>';
  if(i===0)content+=s.masks.filter(m=>m.reason.includes('Logo')).map(m=>rect(m.x,m.y,m.width,m.height,m.radius||0,m.fill)).join('');
  if(i===3){content+=rect(450,270,315,61,0,'white')+text('iPhone',765,315,36,'#929292',400,'end');if(group.display!=='iPhone 11')content+=rect(585,535,183,69,0,'white')+text('—',765,583,34,'#929292',400,'end');}
  if(i===3&&group.ui==='iPhone14')content+=rect(610,350,158,61,0,'white')+text('16.0',765,400,36,'#929292',400,'end');
  if(i===3&&group.display!=='iPhone 11'){
   content+=rect(355,t.y+12,415,t.height-24,0,'white')+text(group.display,765,t.y+65,group.display.length>15?32:38,'#111111',400,'end');
  }
  result+='<symbol id="screen-'+i+'" viewBox="0 0 '+c.width+' '+c.height+'">'+content+'</symbol>';
 });
 return result;
}
function viewport(ui,index,box,window,blur,style){
 const s=ui.screens[index],t=s.target,c=s.crop,factor=box.width/window.width;
 const filter='<filter id="blur-'+index+'" x="-3%" y="-3%" width="106%" height="106%"><feGaussianBlur stdDeviation="'+blur/factor+'"/></filter>';
 const raw='<use href="#screen-'+index+'" width="'+c.width+'" height="'+c.height+'"/>';
 return '<defs>'+filter+'</defs><svg x="'+box.x+'" y="'+box.y+'" width="'+box.width+'" height="'+box.height+'" viewBox="'+[window.x,window.y,window.width,window.height].join(' ')+'" preserveAspectRatio="xMidYMid meet">'+
 '<g filter="url(#blur-'+index+')">'+raw+'</g><g clip-path="url(#sharp-target-'+index+')">'+raw+'</g>'+rect(t.x,t.y,t.width,t.height,8/factor,'none',style.green,1.25/factor)+'</svg>';
}
function stepLabel(i,x,y,font,style){const labels=['Settings','General','About','Model Name'],r=font*.96;return '<circle cx="'+(x+r)+'" cy="'+(y-font*.31)+'" r="'+r+'" fill="#D5F7EE"/>'+text('0'+(i+1),x+r,y+font*.06,font*.9,style.navy,700,'middle')+text(labels[i],x+r*2+10,y+font*.12,font,style.navy,700);}
function callout(layout,members,style){
 const paired=members.length>1;
 let x,y,w,h,labelFont,valueFont,line,labelY,valueY;
 if(layout.id==='premium'){x=1228;y=420;w=228;h=paired?89:64;labelFont=14;valueFont=18.5;line=24;labelY=y+20;valueY=y+45;}
 else if(layout.id==='standard'){x=721;y=paired?517:529;w=236;h=paired?70:58;labelFont=12;valueFont=16;line=21;labelY=y+18;valueY=y+39;}
 else{x=318;y=paired?403:413;w=270;h=paired?42:32;labelFont=9;valueFont=12.3;line=13;labelY=y+11;valueY=y+25;}
 return rect(x,y,w,h,layout.id==='mobile'?14:22,'white',style.green,1.4)+text('Model Name:',x+w/2,labelY,labelFont,style.navy,700,'middle')+members.map((m,i)=>text(m,x+w/2,valueY+i*line,valueFont,style.green,700,'middle')).join('');
}
export function renderTutorial(config,group,layout,assets,members){
 const ui=config.ui[group.ui],style=config.sample.style,blur=config.focus.strength[layout.id];
 const defs=sourceDefs(ui,assets,group),placements=[];
 let content='';
 if(layout.id==='premium'){
  [596,813,1030,1247].forEach((x,i)=>{
   const g=frameGeometry(ui,x,165,188),f=ui.frame,d=g.display,c=ui.screens[i].crop,home=assets[ui.assets.home];
   const frame='<use href="#phone-frame" x="'+x+'" y="165" width="188" height="'+g.h+'"/>';
   const clips='<defs><mask id="viewport-'+i+'" maskUnits="userSpaceOnUse" x="'+d.x+'" y="'+d.y+'" width="'+d.width+'" height="'+d.height+'"><use href="#native-home" transform="translate('+d.x+' '+d.y+') scale('+(d.width/home.width)+' '+(d.height/home.height)+')" filter="url(#screen-alpha-white)"/></mask></defs>';
   content+=stepLabel(i,x+5,146,21,style)+clips+frame+'<g mask="url(#viewport-'+i+')">'+viewport(ui,i,d,{x:0,y:0,width:c.width,height:c.height},blur,style)+'</g>';
   if(i<3)content+='<path d="M'+(x+194)+' 326h15m-6-6 6 6-6 6" fill="none" stroke="'+style.green+'" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>';
   placements.push({step:i+1,mode:'完整机框',box:d,window:c});
  });
 }else{
  const boxes=layout.id==='standard'?[{x:473,y:121,width:228,height:177},{x:724,y:121,width:228,height:177},{x:473,y:362,width:228,height:177},{x:724,y:362,width:228,height:155}]:[{x:308,y:64,width:280,height:77},{x:308,y:168,width:280,height:59},{x:308,y:258,width:280,height:57},{x:308,y:348,width:280,height:55}];
  boxes.forEach((b,i)=>{
   const win=windowFor(ui.screens[i],b.width,b.height),r=layout.id==='mobile'?8:13;
   content+=stepLabel(i,b.x,b.y-(layout.id==='mobile'?10:18),layout.id==='mobile'?13:19,style)+'<defs><clipPath id="panel-'+i+'">'+rect(b.x,b.y,b.width,b.height,r,'white')+'</clipPath></defs>'+rect(b.x,b.y,b.width,b.height,r,'#F8F9FA','#DADDE2',.8)+'<g clip-path="url(#panel-'+i+')">'+viewport(ui,i,b,win,blur,style)+'</g>';
   if(layout.id==='standard'&&(i===0||i===2))content+='<path d="M'+(b.x+b.width+4)+' '+(b.y+88)+'h14m-5-5 5 5-5 5" fill="none" stroke="'+style.green+'" stroke-width="2.5" stroke-linecap="round"/>';
   if(layout.id==='mobile'&&i<3)content+='<path d="M446 '+(b.y+b.height+3)+'v12m-4-4 4 4 4-4" fill="none" stroke="'+style.green+'" stroke-width="2" stroke-linecap="round"/>';
   placements.push({step:i+1,mode:'真实界面等比裁切',box:b,window:win});
  });
 }
 content+=callout(layout,members,style);
 return{defs,svg:content,placements,provenance:ui.provenance,blur};
}
