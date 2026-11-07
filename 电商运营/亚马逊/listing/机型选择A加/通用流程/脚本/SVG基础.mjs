export function xml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

export function textLine(content, x, y, size, color, weight = 400, anchor = "start") {
  return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" font-weight="' + weight + '" fill="' + color + '" text-anchor="' + anchor + '">' + xml(content) + '</text>';
}

export function roundedRect(x, y, width, height, radius, fill, stroke, strokeWidth = 1) {
  return '<rect x="' + x + '" y="' + y + '" width="' + width + '" height="' + height + '" rx="' + radius + '" fill="' + fill + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="' + strokeWidth + '"' : '') + '/>';
}

export function gradient(id, start, end) {
  return '<linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="' + start + '"/><stop offset="100%" stop-color="' + end + '"/></linearGradient>';
}
