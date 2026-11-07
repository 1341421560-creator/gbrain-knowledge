import { roundedRect } from "./SVG基础.mjs";

export function sourceDefinitions(project, models) {
  const sources = [...new Set(models.map(model => model.asset.source))];
  const images = sources.map(key => {
    const source = project.sources[key];
    return '<image id="sheet-' + key + '" width="' + source.width + '" height="' + source.height + '" href="' + source.dataUri + '"/>';
  }).join("");
  const symbols = models.map(model => {
    const c = model.asset.crop;
    return '<clipPath id="mask-' + model.id + '">' + roundedRect(0, 0, c.width, c.height, c.radius, "white") + '</clipPath>' +
      '<symbol id="phone-' + model.id + '" viewBox="0 0 ' + c.width + ' ' + c.height + '"><g clip-path="url(#mask-' + model.id + ')"><use href="#sheet-' + model.asset.source + '" x="' + (-c.x) + '" y="' + (-c.y) + '"/></g></symbol>';
  }).join("");
  return images + symbols;
}

export function placePhone(project, layout, model, card, compatible) {
  const c = model.asset.crop;
  const tier = project.template.sizes.find(item => item.inch === model.inch);
  if (!tier) throw new Error("尺寸模板缺失：" + model.name);
  const height = tier.height_px * layout.scale;
  const width = height * c.width / c.height;
  const x = card.phoneCenterX - width / 2;
  const y = card.baseline - height;
  const factor = height / c.height;
  const b = model.asset.badge;
  return {
    id: model.id, name: model.name, inch: model.inch, compatible,
    templateHeight: tier.height_px, scale: layout.scale,
    x, y, width, height, baseline: card.baseline,
    badge: { x: x + (b.x - c.x) * factor, y: y + (b.y - c.y) * factor, radius: b.radius * factor }
  };
}

