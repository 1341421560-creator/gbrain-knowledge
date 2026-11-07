import fs from 'node:fs/promises';
import path from 'node:path';

export async function writePreview(project,arts){
  const rows=arts.map(a=>'<section><h2>'+a.group.id+' · '+a.layout.name+'</h2><a href="'+encodeURI(a.files.png)+'"><img style="max-width:100%;height:auto" src="'+encodeURI(a.files.png)+'"></a></section>');
  await fs.writeFile(path.join(project.root,'三端预览.html'),'<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>JHWVVTF示意教程三端预览</title><body style="font-family:Arial,Microsoft YaHei"><h1>JHWVVTF · 按对应硬件绘制的SVG示意教程</h1>'+rows.join('')+'</body></html>','utf8');
  await fs.writeFile(path.join(project.root,'交付清单.json'),JSON.stringify(arts.map(a=>({id:a.group.id,variant:a.variant,files:a.files})),null,2),'utf8');
}
export async function writeManifest(root){
  const files=[];async function walk(d){for(const e of await fs.readdir(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())await walk(p);else if(e.name!=='文件清单.json')files.push({path:path.relative(root,p).replaceAll('\\','/'),bytes:(await fs.stat(p)).size});}}
  await walk(root);await fs.writeFile(path.join(root,'文件清单.json'),JSON.stringify(files,null,2),'utf8');
}
