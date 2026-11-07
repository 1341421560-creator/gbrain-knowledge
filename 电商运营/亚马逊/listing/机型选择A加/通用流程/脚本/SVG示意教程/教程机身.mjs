import {rect} from './SVG基础.mjs';
import {renderScreen,selectedRect} from './原生界面.mjs';

// 本批仅允许Home键、宽刘海、小刘海，未实现灵动岛形态。
export function renderDevice(profile,step,{x,y,scale=1,focused=false,id}){
  if(!['home','wide-notch','compact-notch'].includes(profile.frame))throw Error('未经核实的前屏结构');
  const h=370,w=h*profile.body.width/profile.body.height,home=profile.frame==='home';
  let sw,sh,sx,sy;
  if(home){sw=w*.875;sh=sw*profile.screen[1]/profile.screen[0];sx=(w-sw)/2;sy=(h-sh)/2;}
  else{sh=h-(profile.lcd?16:14);sw=sh*profile.screen[0]/profile.screen[1];sx=(w-sw)/2;sy=(h-sh)/2;}
  const radius=home?29:profile.model.includes('12')||profile.model.includes('13')?27:30;
  const screenId='screen-'+id;
  const screen='<clipPath id="'+screenId+'"><rect x="'+sx+'" y="'+sy+'" width="'+sw+'" height="'+sh+'" rx="'+(home?1:23)+'"/></clipPath><g clip-path="url(#'+screenId+')"><g transform="translate('+sx+' '+sy+')">'+renderScreen(step,sw,sh,profile,{focused,clipId:'list-'+id})+'</g></g>';
  let hardware;
  if(home){
    hardware='<g data-feature="home-button">'+rect(w/2-18,20,36,2.8,1.4,'#3C3F43')+'<circle cx="'+(w/2-29)+'" cy="21.3" r="3.1" fill="#18242F"/><circle cx="'+(w/2)+'" cy="'+(h-sy/2)+'" r="12.1" fill="#070707" stroke="#50545A" stroke-width="1.3"/></g>';
  }else{
    const nw=w*(profile.frame==='compact-notch'?.416:.52),nh=20,l=(w-nw)/2,r=(w+nw)/2;
    const notch='<path data-feature="attached-notch" d="M'+(l-6)+' '+sy+'Q'+l+' '+sy+' '+l+' '+(sy+6)+'V'+(sy+nh-7)+'Q'+l+' '+(sy+nh)+' '+(l+8)+' '+(sy+nh)+'H'+(r-8)+'Q'+r+' '+(sy+nh)+' '+r+' '+(sy+nh-7)+'V'+(sy+6)+'Q'+r+' '+sy+' '+(r+6)+' '+sy+'Z" fill="#050505"/>';
    hardware=notch+rect(w/2-17,profile.frame==='compact-notch'?3:sy+6,34,2.4,1.2,'#30343A')+'<circle cx="'+(w/2+nw*.30)+'" cy="'+(sy+10)+'" r="2.7" fill="#0E1827"/>'+rect(w/2-25,h-12,50,3,1.5,'#1B1B1E');
  }
  const svg='<g data-hardware="'+profile.frame+'" data-example="'+profile.model+'" transform="translate('+x+' '+y+') scale('+scale+')">'+rect(-1,-1,w+2,h+2,radius+1,'#A5A8AD')+rect(0,0,w,h,radius,'#101113','#050505',1)+rect(3,3,w-6,h-6,radius-3,'#050505','#55595D',.5)+screen+hardware+'</g>';
  const q=selectedRect(step,sw,focused,sh);
  return {svg,width:w*scale,height:h*scale,frame:profile.frame,model:profile.model,body_ratio:w/h,selected:{x:x+(sx+q.x)*scale,y:y+(sy+q.y)*scale,width:q.width*scale,height:q.height*scale},source_screen:{width:sw,height:sh},notch_width:home?0:w*(profile.frame==='compact-notch'?.416:.52)};
}
