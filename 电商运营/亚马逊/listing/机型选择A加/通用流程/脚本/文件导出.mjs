import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import crypto from "node:crypto";

export function createExporter(sharpPath) {
  const require = createRequire(import.meta.url);
  const requested = sharpPath || process.env.SHARP_MODULE || "sharp";
  const resolved = requested.startsWith(".") ? path.resolve(process.cwd(), requested) : requested;
  let sharp;
  try { sharp = require(resolved); }
  catch { throw new Error("未找到Sharp。请在共享运行环境安装项目指定版本，并通过命令参数或SHARP_MODULE传入模块路径。"); }
  return {
    sharp,
    async writeArtwork(project, layout, target, built) {
      const variant = project.settings.variants[layout.id];
      const fileLabel = layout.id === "premium" ? "高级A加" : layout.id === "standard" ? "普通A加" : "移动端";
      const relativeStem = [project.settings.output, variant.folder, target.family, target.id + "_" + fileLabel + "_" + layout.width + "x" + layout.height].join("/");
      const stem = path.join(project.outputRoot, relativeStem);
      await fs.mkdir(path.dirname(stem), { recursive: true });
      const buffer = Buffer.from(built.svg, "utf8");
      await fs.writeFile(stem + ".svg", built.svg, "utf8");
      await Promise.all([
        sharp(buffer).flatten({ background: "#FFFFFF" }).png({ compressionLevel: 9 }).withMetadata({ density: 96 }).toFile(stem + ".png"),
        sharp(buffer).flatten({ background: "#FFFFFF" }).jpeg({ quality: 95, chromaSubsampling: "4:4:4" }).withMetadata({ density: 96 }).toFile(stem + ".jpg")
      ]);
      const metadata = {};
      for (const ext of ["png", "jpg"]) {
        const meta = await sharp(stem + "." + ext).metadata();
        if (meta.width !== layout.width || meta.height !== layout.height || meta.channels !== 3) throw new Error("画布规格错误：" + target.id);
        metadata[ext] = { width: meta.width, height: meta.height, channels: meta.channels, density: meta.density };
      }
      return {
        id: target.id, name: target.name, family: target.family, display: target.inch,
        variant: layout.id, variantLabel: variant.label, width: layout.width, height: layout.height,
        metadata, os: target.os,
        files: Object.fromEntries(["png", "jpg", "svg"].map(ext => [ext, relativeStem + "." + ext])),
        png_sha256: crypto.createHash("sha256").update(await fs.readFile(stem + ".png")).digest("hex"),
        phones: built.placements
      };
    }
  };
}
