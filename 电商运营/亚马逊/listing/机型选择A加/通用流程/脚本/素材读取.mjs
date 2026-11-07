import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

async function readJson(file) {
  return JSON.parse((await fs.readFile(file, "utf8")).replace(/^\uFEFF/, ""));
}

async function readSourceIndex(file) {
  const index = await readJson(file);
  return Object.fromEntries(await Promise.all(Object.entries(index).map(async ([key, item]) => {
    const absoluteFile = path.resolve(path.dirname(file), item.path);
    return [key, { ...item, absoluteFile, dataUri: "data:image/png;base64," + (await fs.readFile(absoluteFile)).toString("base64") }];
  })));
}

export async function readProject(input) {
  const configPath = input instanceof URL ? fileURLToPath(input) : path.resolve(input);
  const root = path.resolve(path.dirname(configPath), "..");
  const settings = await readJson(configPath);
  const keys = ["layouts", "style", "template", "catalog", "tutorials", "storeRules"];
  const values = await Promise.all(keys.map(key => readJson(path.resolve(root, settings[key]))));
  const config = Object.fromEntries(keys.map((key, index) => [key, values[index]]));
  const sources = { ...await readSourceIndex(path.resolve(root, settings.sources)), ...await readSourceIndex(path.resolve(root, settings.tutorialSources)) };
  const models = config.catalog.map(material => {
    const rule = config.storeRules.find(item => item.id === material.id);
    const item = { ...material, ...(rule || { target: false }) };
    const c = item.crop;
    const badge = item.markRegion || { x: c.x + c.width / 2, y: c.y + c.height * 0.55, radius: c.height * 0.18 };
    return { ...item, asset: { source: item.source, crop: c, badge } };
  });
  const targets = models.filter(item => item.target).map(target => {
    const comparisons = target.comparisons.map(id => {
      const model = models.find(item => item.id === id);
      if (!model) throw new Error("店铺配置比较型号不存在：" + id);
      return model;
    });
    if (new Set([target.id, ...comparisons.map(item => item.id)]).size !== 4) throw new Error("店铺四宫格配置不正确：" + target.id);
    return { ...target, order: [target, ...comparisons].map(item => item.name) };
  });
  if (targets.length !== settings.expectedTargets) throw new Error("店铺目标数量与配置不一致。");
  const outputRoot = path.resolve(root, process.env.APLUS_OUTPUT_ROOT || settings.outputDirectory);
  const knowledgeRoot = path.resolve(root, settings.knowledgeRoot || "../../..");
  return { root, outputRoot, knowledgeRoot, settings, layouts: config.layouts, ...config.style, template: config.template, tutorials: config.tutorials, models, targets, sources };
}
