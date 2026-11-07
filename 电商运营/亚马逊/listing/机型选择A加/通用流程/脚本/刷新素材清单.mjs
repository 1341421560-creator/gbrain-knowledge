import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../..", import.meta.url));
async function scan(directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (["output", "node_modules", ".cache"].includes(entry.name)) continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await scan(file));
    else if (!file.endsWith(".md")) {
      const data = await fs.readFile(file);
      files.push({ path: path.relative(root, file).split(path.sep).join("/"), bytes: data.length, sha256: crypto.createHash("sha256").update(data).digest("hex") });
    }
  }
  return files;
}
const files = (await Promise.all(["通用素材", "通用流程", "店铺模板"].map(name => scan(path.join(root, name))))).flat().sort((a, b) => a.path.localeCompare(b.path, "zh-CN"));
const exampleFiles = files.filter(item => item.path.includes("/参考结果/"));
const value = { scope: "通用素材、通用流程和店铺专属模板；不收录批量生成结果", relative_root: ".", retained_example_pngs: exampleFiles.filter(item => item.path.toLowerCase().endsWith(".png")).length, retained_example_jpgs: exampleFiles.filter(item => /\.jpe?g$/i.test(item.path)).length, retained_example_images: exampleFiles.length, files };
await fs.writeFile(path.join(root, "素材与模板清单.json"), JSON.stringify(value, null, 2), "utf8");
console.log(JSON.stringify({ files: files.length, bytes: files.reduce((sum, item) => sum + item.bytes, 0), retained_example_pngs: value.retained_example_pngs, retained_example_jpgs: value.retained_example_jpgs, retained_example_images: value.retained_example_images }));
