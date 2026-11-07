export const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
export const text = (value,x,y,size,fill,weight=400,anchor='start') => '<text x="'+x+'" y="'+y+'" font-size="'+size+'" fill="'+fill+'" font-weight="'+weight+'" text-anchor="'+anchor+'">'+escape(value)+'</text>';
export const rect = (x,y,width,height,radius,fill,stroke='none',strokeWidth=1) => '<rect x="'+x+'" y="'+y+'" width="'+width+'" height="'+height+'" rx="'+radius+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+strokeWidth+'"/>';
export function pill(label,x,y,width,height,fill,ink,size) {
  return rect(x,y,width,height,height/2,fill)+text(label,x+width/2,y+height*.69,size,ink,700,'middle');
}
export function statusMark(x,y,radius,positive) {
  const color=positive?'url(#check-green)':'url(#cross-red)';
  const stroke=radius*.22;
  const path=positive?'M'+(x-radius*.47)+' '+y+'l'+radius*.32+' '+radius*.32+' '+radius*.64+' '+(-radius*.69):'M'+(x-radius*.35)+' '+(y-radius*.35)+'l'+radius*.7+' '+radius*.7+'m0 '+(-radius*.7)+'l'+(-radius*.7)+' '+radius*.7;
  return '<circle cx="'+x+'" cy="'+y+'" r="'+radius+'" fill="'+color+'"/><path d="'+path+'" stroke="white" stroke-width="'+stroke+'" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
}
