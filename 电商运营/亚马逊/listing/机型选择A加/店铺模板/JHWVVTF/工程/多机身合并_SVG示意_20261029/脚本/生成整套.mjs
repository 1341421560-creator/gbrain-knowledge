import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {readProject} from '../../../../../通用流程/脚本/SVG示意工程读取.mjs';
import {auditBatch} from '../../../../../通用流程/脚本/SVG示意成品核对.mjs';
import {writePreview,writeManifest} from '../../../../../通用流程/脚本/SVG示意预览.mjs';
import {buildArtwork} from './版式构建.mjs';
import {exportArtwork} from './文件导出.mjs';

// 入口负责参数解析、依赖组装与流程启动。
const args=process.argv.slice(2),value=k=>args[args.indexOf(k)+1];
if(!args.includes('--sharp-module')||!args.includes('--output'))throw Error('用法：生成整套.mjs --sharp-module <模块路径> --output <项目输出目录> [--group M02]');
const sharp=createRequire(import.meta.url)(path.resolve(value('--sharp-module'))),root=fileURLToPath(new URL('..',import.meta.url));
const project=await readProject(root,sharp,{outputRoot:value('--output')});
try{project.single=JSON.parse(await fs.readFile(path.join(root,'配置/单型号布局.json'),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
if(args.includes('--group'))project.groups=project.groups.filter(g=>g.id===value('--group'));
if(!project.groups.length)throw Error('指定分组不存在');
const arts=[];
for(const g of project.groups)for(const v of ['premium','standard','mobile']){arts.push(await exportArtwork(project,buildArtwork(project,g,v)));console.log(g.id+' '+v);}
await auditBatch(project,arts);await writePreview(project,arts);await writeManifest(project.root);
