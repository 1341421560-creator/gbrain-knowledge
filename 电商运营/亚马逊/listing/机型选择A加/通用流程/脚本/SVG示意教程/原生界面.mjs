import {rect,text} from './SVG基础.mjs';
import {appIcon,menuIcon} from './界面图标.mjs';

const soft=s=>'<g filter="url(#ui-secondary)">'+s+'</g>';
const context=s=>'<g filter="url(#ui-context)">'+s+'</g>';

export function uiDefinitions(t){return '<filter id="ui-context" x="-15%" y="-30%" width="130%" height="160%"><feGaussianBlur stdDeviation="'+t.blur.context+'"/></filter><filter id="ui-secondary" x="-20%" y="-70%" width="140%" height="240%"><feGaussianBlur stdDeviation="'+t.blur.text+'"/></filter><linearGradient id="gear-bg"><stop stop-color="#E0E1E3"/><stop offset="1" stop-color="#ADB0B4"/></linearGradient><linearGradient id="ui-selected"><stop stop-color="#FBFFF9"/><stop offset="1" stop-color="#E8F8E9"/></linearGradient><linearGradient id="ui-wallpaper" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#9F8DE2"/><stop offset="1" stop-color="#CBD0F1"/></linearGradient>';}

function statusBar(w){return soft(text('9:41',8,13,7.7,'#111111',700)+text('▮▮ ▰',w-7,13,7,'#111111',400,'end'));}

export function row(x,y,w,label,{selected=false,value='',icon=false,height=24,split=false}={}){
  const start=x+(icon?28:8),ink=selected?'#171717':'#60636A';
  let labelSvg=text(label,start,y+(split?12:16),split?9.8:10.5,ink);
  if(value)labelSvg+=text(value,split?x+w-8:x+w-8,y+(split?26:16),selected?11.5:9,selected?'#087513':'#81858C',selected?700:400,'end');
  else labelSvg+=text('›',x+w-8,y+17,15,'#9A9EA5',400,'end');
  const out=rect(x,y,w,height,selected?7:2,selected?'url(#ui-selected)':'#FFFFFF',selected?'#118A18':'none',1.1)+(icon?menuIcon(label,x+6,y+4,15):'')+(selected?labelSvg:soft(labelSvg));
  return selected?out:context(out);
}

function home(w,h){
  const names=['Settings','Photos','Camera','Mail','Messages','Calendar','Notes','Clock','Reminders','AppStore','Maps','Health','Podcasts','Weather','Books','Wallet','Files','Calculator','Contacts','Voice Memos','Shortcuts','Translate','Tips','Measure'];
  const compact=h<300,n=compact?25:27,pitch=compact?41:44,rows=compact?5:6;
  let out=rect(0,0,w,h,1,'url(#ui-wallpaper)')+statusBar(w);
  names.slice(0,rows*4).forEach((name,i)=>{
    const cell=w/4,x=cell*(i%4)+(cell-n)/2,y=34+Math.floor(i/4)*pitch;
    if(name==='Settings')out+=rect(x-5,y-(compact?4:5),n+10,compact?45:49,7,'#F2FFF0','#118A18',1.1)+appIcon(name,x,y,n)+text('Settings',x+n/2,y+n+11,7.7,'#111111',600,'middle');
    else out+=context(appIcon(name,x,y,n)+soft(text(name,x+n/2,y+n+11,name.length>9?6.2:6.9,'#FFFFFF',500,'middle')));
  });
  out+=context(rect(5,h-41,w-10,35,9,'#C4CAE6')+['Phone','Safari','Messages','Music'].map((name,i)=>appIcon(name,10+i*(w-20)/4,h-37,27)).join(''));
  return out;
}

function settings(w,h){
  const rows=[['Screen Time',44],['General',78],['Control Center',108],['Display & Brightness',136],['Home Screen',164],['Accessibility',192],['Wallpaper',220],['Siri & Search',248]];
  return rect(0,0,w,h,1,'#F2F2F7')+statusBar(w)+soft(text('Settings',w/2,31,11.7,'#111111',700,'middle'))+rows.map(([label,y])=>row(4,y,w-8,label,{selected:label==='General',icon:true,height:26})).join('');
}

function general(w,h){
  const rows=[['About',49],['Software Update',79],['AirDrop',122],['AirPlay & Handoff',150],['Picture in Picture',178],['CarPlay',206],['iPhone Storage',248],['Background App Refresh',276]];
  return rect(0,0,w,h,1,'#F2F2F7')+statusBar(w)+soft(text('‹ Settings',4,31,7.5,'#167ADB')+text('General',w/2,31,11,'#111111',700,'middle'))+rows.map(([label,y])=>row(4,y,w-8,label,{selected:label==='About',height:26})).join('');
}

function about(w,h,profile,focused,clipId){
  const selectedY=focused?39:87,selectedH=focused?32:38;
  const shift=focused?48:0;
  const rows=[['Name','iPhone',38-shift],['Software Version',profile.os,62-shift],['Model Number','—',130-shift],['Serial Number','—',158-shift]];
  const list=rows.map(([label,value,y])=>row(4,y,w-8,label,{value,height:24})).join('')+row(4,selectedY,w-8,'Model Name',{selected:true,value:profile.name,height:selectedH,split:true});
  return rect(0,0,w,h,1,'#F2F2F7')+statusBar(w)+soft(text('‹ General',4,31,7.5,'#167ADB')+text('About',w/2,31,11,'#111111',700,'middle'))+'<clipPath id="'+clipId+'"><rect x="0" y="35" width="'+w+'" height="'+(h-35)+'"/></clipPath><g clip-path="url(#'+clipId+')">'+list+'</g>';
}

export function renderScreen(step,w,h,profile,{focused=false,clipId='about-list'}={}){
  if(step===0)return home(w,h);
  if(step===1)return settings(w,h);
  if(step===2)return general(w,h);
  return about(w,h,profile,focused,clipId);
}

export function selectedRect(step,w,focused,h){
  const compact=h<300;
  return [{x:w/8-(compact?17.5:18.5),y:compact?30:29,width:compact?35:37,height:compact?45:49},{x:4,y:78,width:w-8,height:26},{x:4,y:49,width:w-8,height:26},{x:4,y:focused?39:87,width:w-8,height:focused?32:38}][step];
}
