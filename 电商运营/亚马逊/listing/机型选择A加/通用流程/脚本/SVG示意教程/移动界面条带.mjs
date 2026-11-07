import {rect,text} from './SVG基础.mjs';
import {appIcon,menuIcon} from './界面图标.mjs';

const soft=s=>'<g filter="url(#ui-secondary)">'+s+'</g>';
const context=s=>'<g filter="url(#ui-context)">'+s+'</g>';

function stripRow(x,y,w,label,{selected=false,value='',icon=false,h=22}={}){
  const start=x+(icon?31:8),labels=text(label,start,y+h*.70,selected?11.4:10.5,'#171717')+(value?text(value,x+w-8,y+h*.70,selected?11.8:9.7,selected?'#087513':'#858991',selected?700:400,'end'):text('›',x+w-8,y+h*.74,14,'#989CA4',400,'end'));
  const s=rect(x,y,w,h,selected?6:2,selected?'url(#ui-selected)':'#FFFFFF',selected?'#118A18':'none',1)+(icon?menuIcon(label,x+7,y+(h-15)/2,15):'')+(selected?labels:soft(labels));
  return selected?s:context(s);
}

export function renderStrip(profile,step,cfg){
  const x=cfg.x,w=cfg.width,box=cfg.strips[step],y=box.y,id='strip-'+step;
  let svg='<clipPath id="'+id+'"><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+box.h+'" rx="7"/></clipPath><g clip-path="url(#'+id+')">'+rect(x,y,w,box.h,7,step===0?'url(#ui-wallpaper)':'#F2F2F7');
  let selected;
  if(step===0){
    ['Settings','Photos','Camera','Mail'].forEach((name,i)=>{
      const n=38,cx=x+w*(i+.5)/4,ix=cx-n/2,iy=y+5;
      if(i===0){svg+=rect(ix-5,iy-3,n+10,55,7,'#F3FFF1','#118A18',1.1)+appIcon(name,ix,iy,n)+text('Settings',cx,y+56,10,'#111111',600,'middle');selected={x:ix-5,y:iy-3,width:n+10,height:55};}
      else svg+=context(appIcon(name,ix,iy,n)+soft(text(name,cx,y+56,10,'#52566E',500,'middle')));
    });
  }else if(step===1){
    svg+=stripRow(x+7,y+1,w-14,'Screen Time',{icon:true,h:21})+stripRow(x+7,y+23,w-14,'General',{selected:true,icon:true,h:24})+stripRow(x+7,y+49,w-14,'Control Center',{icon:true,h:21});
    selected={x:x+7,y:y+23,width:w-14,height:24};
  }else if(step===2){
    svg+=stripRow(x+7,y+3,w-14,'About',{selected:true,h:24})+stripRow(x+7,y+29,w-14,'Software Update',{h:21});
    selected={x:x+7,y:y+3,width:w-14,height:24};
  }else{
    svg+=stripRow(x+7,y,w-14,'Name',{value:'iPhone',h:15})+stripRow(x+7,y+15,w-14,'Software Version',{value:profile.os,h:15})+stripRow(x+7,y+30,w-14,'Model Name',{selected:true,value:profile.name,h:22});
    selected={x:x+7,y:y+30,width:w-14,height:22};
  }
  return {svg:svg+'</g>',selected,clip:{x,y,width:w,height:box.h},frame:'interface-strip',model:profile.model};
}
