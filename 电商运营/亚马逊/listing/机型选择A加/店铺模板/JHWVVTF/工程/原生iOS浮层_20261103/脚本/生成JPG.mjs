import path from 'node:path';
import {createRequire} from 'node:module';
import {readConfiguration} from './读取配置.mjs';
import {loadAssets} from '../../../../../通用流程/脚本/图片数据载入.mjs';
import {exportJpg} from './导出JPG.mjs';

if(!process.argv[2]||!process.argv[3])throw new Error('用法：生成JPG.mjs <Sharp模块路径> <项目输出目录> [目标型号ID]');
const require=createRequire(import.meta.url),sharp=require(process.argv[2]),root=path.resolve(import.meta.dirname,'..');
const config=await readConfiguration(root),assets=await loadAssets(root,config,sharp);
const records=await exportJpg(config,assets,sharp,path.resolve(process.argv[3]),process.argv[4]);
console.log('完成 '+records.length+' 张 JPG');
