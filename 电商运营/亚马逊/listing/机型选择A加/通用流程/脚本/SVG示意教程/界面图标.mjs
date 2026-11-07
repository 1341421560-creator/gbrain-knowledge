import {rect,text} from './SVG基础.mjs';

export function gear(x,y,n){
  const cx=x+n/2,cy=y+n/2;
  const teeth=Array.from({length:12},(_,i)=>'<path d="M'+cx+' '+(cy-n*.39)+'v'+n*.13+'" stroke="#62666B" stroke-width="'+n*.10+'" transform="rotate('+i*30+' '+cx+' '+cy+')"/>').join('');
  return rect(x,y,n,n,n*.20,'url(#gear-bg)')+teeth+'<circle cx="'+cx+'" cy="'+cy+'" r="'+n*.29+'" fill="none" stroke="#52565B" stroke-width="'+n*.06+'"/><circle cx="'+cx+'" cy="'+cy+'" r="'+n*.18+'" fill="none" stroke="#60646A" stroke-width="'+n*.07+'"/>';
}
export function appIcon(kind,x,y,n=27){
  if(kind==='Settings')return gear(x,y,n);
  const colors={Photos:'#FFFFFF',Camera:'#C0C2C5',Mail:'#168EF1',Messages:'#37CF58',Calendar:'#FFFFFF',Notes:'#FFFFFF',Clock:'#1B1B1D',Phone:'#36CB56',Safari:'#FFFFFF',Music:'#FA4D68',Reminders:'#FFFFFF',AppStore:'#168EF1',Maps:'#93CA89',Health:'#FFFFFF',Podcasts:'#A75CE0',Weather:'#3B9DE9',Books:'#EE9B32',Wallet:'#34373D',Files:'#FFFFFF',Calculator:'#35363A',Contacts:'#9FA4A9','Voice Memos':'#222327',Shortcuts:'#594E99',Translate:'#25272B',Tips:'#F3C643',Measure:'#292B2D'};
  let out=rect(x,y,n,n,n*.22,colors[kind]||'#97A4E7');
  if(kind==='Photos')out+=Array.from({length:8},(_,i)=>'<ellipse cx="'+(x+n/2)+'" cy="'+(y+n*.28)+'" rx="'+n*.135+'" ry="'+n*.225+'" fill="'+['#EB5774','#F2A140','#F8DB4C','#8EC65B','#58BCAE','#5898D2','#8376BF','#C769A4'][i]+'" opacity=".85" transform="rotate('+i*45+' '+(x+n/2)+' '+(y+n/2)+')"/>').join('');
  else if(kind==='Camera')out+=rect(x+n*.17,y+n*.25,n*.66,n*.52,n*.08,'#4D5056')+'<circle cx="'+(x+n/2)+'" cy="'+(y+n*.51)+'" r="'+n*.17+'" fill="#1C242E" stroke="#98A0A8" stroke-width="'+n*.05+'"/>';
  else if(kind==='Mail')out+='<path d="M'+(x+n*.15)+' '+(y+n*.27)+'h'+n*.7+'v'+n*.48+'h'+(-n*.7)+'z m0 0 '+n*.35+' '+n*.26+' '+n*.35+' '+(-n*.26)+'" fill="white" stroke="#168EF1" stroke-width="'+n*.04+'"/>';
  else if(kind==='Messages')out+=rect(x+n*.16,y+n*.23,n*.68,n*.5,n*.18,'white');
  else if(kind==='Calendar')out+=text('9',x+n/2,y+n*.80,n*.66,'#171717',400,'middle');
  else if(kind==='Notes')out+=rect(x,y,n,n*.25,n*.08,'#F5D754')+text('≡',x+n/2,y+n*.83,n*.6,'#9A9DA1',400,'middle');
  else if(kind==='Clock')out+='<circle cx="'+(x+n/2)+'" cy="'+(y+n/2)+'" r="'+n*.36+'" fill="white"/><path d="M'+(x+n/2)+' '+(y+n*.23)+'v'+n*.27+'l'+n*.16+' '+n*.1+'" fill="none" stroke="#171717" stroke-width="'+n*.06+'"/>';
  else if(kind==='Reminders')out+=['#F48B47','#469DEB','#EAC947'].map((color,i)=>'<circle cx="'+(x+n*.23)+'" cy="'+(y+n*(.27+i*.22))+'" r="'+n*.06+'" fill="'+color+'"/><path d="M'+(x+n*.4)+' '+(y+n*(.27+i*.22))+'h'+n*.38+'" stroke="#B9BDC1" stroke-width="'+n*.04+'"/>').join('');
  else if(kind==='Wallet')out+=rect(x+n*.15,y+n*.2,n*.7,n*.6,n*.07,'#EBA159')+rect(x+n*.15,y+n*.34,n*.7,n*.45,n*.04,'#78BCAE')+rect(x+n*.15,y+n*.50,n*.7,n*.3,n*.03,'#F2CE74');
  else if(kind==='Files')out+=rect(x+n*.16,y+n*.3,n*.68,n*.48,n*.06,'#318FE7')+rect(x+n*.16,y+n*.22,n*.30,n*.16,n*.04,'#318FE7');
  else out+=text(({Phone:'☎',Safari:'◈',Music:'♪',AppStore:'A',Maps:'↗',Health:'♥',Podcasts:'◉',Weather:'☀',Books:'▤',Calculator:'▦',Contacts:'●','Voice Memos':'▥',Shortcuts:'◆',Translate:'文',Tips:'☀',Measure:'▱'})[kind]||'•',x+n/2,y+n*.77,n*.65,kind==='Safari'?'#168EF1':kind==='Health'?'#F05378':'white',600,'middle');
  return out;
}

export function menuIcon(kind,x,y,n=15){
  if(kind==='General')return gear(x,y,n);
  const colors={'Screen Time':'#7257CF','Control Center':'#91959D','Display & Brightness':'#1988ED','Home Screen':'#2176CF',Accessibility:'#188CF0',Wallpaper:'#43B8B5','Siri & Search':'#262834'};
  return rect(x,y,n,n,n*.2,colors[kind]||'#91959D')+text(({'Screen Time':'⌛','Control Center':'☷','Display & Brightness':'A','Home Screen':'▦',Accessibility:'◎',Wallpaper:'▥','Siri & Search':'◉'})[kind]||'•',x+n/2,y+n*.77,n*.68,'white',600,'middle');
}
