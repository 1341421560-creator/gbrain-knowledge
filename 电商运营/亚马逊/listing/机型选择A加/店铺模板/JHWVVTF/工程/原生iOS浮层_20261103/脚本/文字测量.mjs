import {roundedRect as rect,textLine as text,xml,gradient} from '../../../../../通用流程/脚本/SVG基础.mjs';

export function createTextMeasurer(sharp){
 const cache=new Map();
 return async function measure(content,font,weight){
  const key=JSON.stringify([content,font,weight]);if(cache.has(key))return cache.get(key);
  const svg='<svg width="1600" height="100"><text x="5" y="75" font-family="Arial" font-size="'+font+'" font-weight="'+weight+'">'+xml(content)+'</text></svg>';
  const {info}=await sharp(Buffer.from(svg)).trim().png().toBuffer({resolveWithObject:true});
  cache.set(key,info.width);return info.width;
 };
}
