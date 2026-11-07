import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';

// 默认只保留SVG；PNG须显式导出到知识库外的项目输出目录。
const root=path.resolve(import.meta.dirname,'../..');
const file=path.join(root,'通用素材/手机机身/尺寸与轮廓/真实机身尺寸模板.json');
const args=process.argv.slice(2),pngFlag=args.indexOf('--png-output');
if(pngFlag>=0&&!args[pngFlag+1])throw Error('--png-output需要明确输出目录。');
const pngOutput=pngFlag>=0?path.resolve(args[pngFlag+1]):null;
if(pngOutput){
  const relative=path.relative(root,pngOutput);
  if(relative===''||(!relative.startsWith('..'+path.sep)&&relative!=='..'&&!path.isAbsolute(relative)))throw Error('PNG输出必须在知识库外。');
}
const sharpPath=args[0]&&!args[0].startsWith('--')?args[0]:null;
if(pngOutput&&!sharpPath)throw Error('按需导出PNG时请传入共享Sharp模块路径。');
const sharp=pngOutput?createRequire(import.meta.url)(path.resolve(sharpPath)):null;
const template=JSON.parse((await fs.readFile(file,'utf8')).replace(/^\uFEFF/,''));
const folder=path.join(path.dirname(file),'真实毫米轮廓');
await fs.mkdir(folder,{recursive:true});
if(pngOutput)await fs.mkdir(pngOutput,{recursive:true});
for(const p of template.profiles){
  const w=p.body_mm.width*template.reference.px_per_mm,h=p.body_mm.height*template.reference.px_per_mm,cw=240,ch=Math.ceil(h+95),x=(cw-w)/2;
  const svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+cw+'" height="'+ch+'" viewBox="0 0 '+cw+' '+ch+'"><g font-family="Arial,sans-serif"><text x="120" y="19" text-anchor="middle" font-size="13" fill="#154B38">'+p.display_inches.toFixed(1)+'-inch · '+p.body_mm.height+' × '+p.body_mm.width+' mm</text><rect x="'+x+'" y="34" width="'+w+'" height="'+h+'" rx="20" fill="#E9F1ED" stroke="#6B8077" stroke-width="1.4"/><path d="M10 '+(34+h)+'H230" stroke="#A0B6AC" stroke-dasharray="4 3"/><text x="120" y="'+(h+62)+'" text-anchor="middle" font-size="12" fill="#154B38">'+w.toFixed(2)+' × '+h.toFixed(2)+' px</text></g></svg>';
  const stem=p.id,svgName='真实毫米轮廓/'+stem+'.svg';
  await fs.writeFile(path.join(path.dirname(file),svgName),svg,'utf8');
  if(pngOutput)await sharp(Buffer.from(svg)).png().toFile(path.join(pngOutput,stem+'.png'));
  p.files={svg:svgName,png:null,raster_export:'on_demand_from_svg'};
}
template.outline_storage_policy={preferred_format:'svg',resident_png:false,png_generation:'PNG按需导出到知识库外，png=null由调用方选择SVG。'};
await fs.writeFile(file,JSON.stringify(template,null,2)+'\n','utf8');
console.log('已更新'+template.profiles.length+'种SVG轮廓；'+(pngOutput?'PNG已按需导出。':'知识库不生成常驻PNG。'));
