"""修订右侧刘海屏和局部点击提示，保留外部版式。"""
import xml.etree.ElementTree as ET
from .vector import image_uri, rect
from .notched_header import header, frame
from .tap_overlays import overlays

NS = 'http://www.w3.org/2000/svg'
ET.register_namespace('', NS)


def tag(name):
    return '{' + NS + '}' + name


def add(parent, markup):
    parent.extend(list(ET.fromstring(f'<svg xmlns="{NS}">{markup}</svg>')))


def build(root, config, font):
    tree = ET.parse(root / config['input_svg'])
    svg = tree.getroot()
    definitions = ET.SubElement(svg, tag('defs'))
    ET.SubElement(definitions, tag('image'), {'id': 'tap-settings-source', 'href': image_uri(root / config['settings_source'])})
    ET.SubElement(definitions, tag('image'), {'id': 'tap-general-source', 'href': image_uri(root / config['general_source'])})
    cards = [node for node in svg if node.get('clip-path', '').startswith(config['screen_clip_prefix'])]
    if len(cards) != 4:
        raise ValueError('四张教程屏幕定位错误。')
    zooms = overlays(config, font)
    for index, card in enumerate(cards):
        view = next(node for node in card if node.tag == tag('svg'))
        x, y, width, height = [float(view.get(key)) for key in ('x','y','width','height')]
        clip_id = f'notch-screen-{index}'
        clip = ET.SubElement(definitions, tag('clipPath'), {'id': clip_id})
        add(clip, rect(x + .6, y + .6, width - 1.2, height - 1.2, '#FFFFFF', config['notch']['corner_radius']))
        card.remove(view)
        group = ET.SubElement(card, tag('g'), {'clip-path': f'url(#{clip_id})', 'data-screen': str(index + 1)})
        group.append(view)
        add(group, header(x, y, width, height, index, config, font))
        add(card, frame(x, y, width, height, config))
        zoom = ET.SubElement(card, tag('g'), {'data-tap-zoom': str(index + 1)})
        add(zoom, zooms[index])
    target = root / config['output_svg']
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists():
        raise FileExistsError(target)
    tree.write(target, encoding='utf-8', xml_declaration=True)
    return target
