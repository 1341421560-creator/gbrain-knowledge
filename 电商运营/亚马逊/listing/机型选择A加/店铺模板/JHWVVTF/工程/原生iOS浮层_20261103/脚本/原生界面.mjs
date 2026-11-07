import {roundedRect as rect,textLine as text,xml,gradient} from '../../../../../通用流程/脚本/SVG基础.mjs';

export function sourceDefinitions(ui,assets,displayName){
 let result=Object.entries(ui.assets).map(([id,p])=>{const a=assets[p];return '<image id="native-'+id+'" href="'+a.dataUri+'" width="'+a.width+'" height="'+a.height+'"/>';}).join('');
 result+='<symbol id="phone-frame" viewBox="0 0 '+ui.frame.width+' '+ui.frame.height+'"><use href="#native-frame"/></symbol><filter id="alpha-white" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/></filter>';
 ui.screens.forEach((s,i)=>{
  const w=s.crop.width,h=s.crop.height,t=s.target;
  let content='<use href="#native-'+s.asset+'"/>';
  // 仅覆盖原始界面中的苹果图形，不遮盖菜单文字。
  if(i===0){
   const tv={x:s.pointer.x-w*.46,y:s.pointer.y-h*.116},side=w*.164;
   content+=rect(tv.x-side/2,tv.y-side/2,side,side,side*.19,'#252525')+text('TV',tv.x,tv.y+side*.15,side*.44,'white',500,'middle');
  }
  content+=(s.logoMasks||[]).map(m=>rect(m.x,m.y,m.width,m.height,0,m.fill)).join('');
  // 运营商原图将型号值留空，仅按原生行高补充与目标卡片一致的示例值。
  if(i===3&&displayName)content+=text(displayName,w*.918,t.y+t.height*.66,w*.0415,'#8B8B8F',400,'end');
  result+='<clipPath id="focus-'+i+'">'+rect(t.x,t.y,t.width,t.height,0,'white')+'</clipPath><symbol id="screen-'+i+'" viewBox="0 0 '+w+' '+h+'">'+content+'</symbol>';
 });return result;
}

export function nativeViewport(ui,index,box,window,blur,color){
 const s=ui.screens[index],t=s.target,c=s.crop,factor=box.width/window.width;
 const left=Math.max(t.x,window.x+6/factor),right=Math.min(t.x+t.width,window.x+window.width-6/factor);
 const defs='<filter id="soft-'+index+'" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="'+blur/factor+'"/></filter>';
 const raw='<use href="#screen-'+index+'" width="'+c.width+'" height="'+c.height+'"/>';
 return '<defs>'+defs+'</defs><svg x="'+box.x+'" y="'+box.y+'" width="'+box.width+'" height="'+box.height+'" viewBox="'+[window.x,window.y,window.width,window.height].join(' ')+'" preserveAspectRatio="xMidYMid meet"><g filter="url(#soft-'+index+')">'+raw+'</g><g clip-path="url(#focus-'+index+')">'+raw+'</g>'+rect(left,t.y,right-left,t.height,7/factor,'none',color,1.35/factor)+'</svg>';
}

export function sourceCrop(index,ui,source,box){
 const c=ui.screens[index].crop;
 return '<svg x="'+box.x+'" y="'+box.y+'" width="'+box.width+'" height="'+box.height+'" viewBox="'+[source.x,source.y,source.width,source.height].join(' ')+'" preserveAspectRatio="xMidYMid meet"><use href="#screen-'+index+'" width="'+c.width+'" height="'+c.height+'"/></svg>';
}
