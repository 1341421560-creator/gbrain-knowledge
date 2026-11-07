"""依据左侧刘海外观绘制教程屏幕顶部，遮去旧灵动岛。"""
from .vector import rect


def header(x, y, width, height, index, config, font):
    setting, colors = config['notch'], config['colors']
    fill = setting['home_header_fill'] if index == 0 else setting['other_header_fill']
    ink = '#FFFFFF' if index == 0 else colors['frame']
    markup = rect(x, y, width, setting['header_height'], fill)
    notch_width = width * setting['width_ratio']
    left, right = x + (width - notch_width) / 2, x + (width + notch_width) / 2
    bottom = y + setting['depth']
    path = f'M{left} {y}H{right}V{y+2}Q{right-2} {y+2} {right-2} {y+5}V{bottom-5}Q{right-2} {bottom} {right-8} {bottom}H{left+8}Q{left+2} {bottom} {left+2} {bottom-5}V{y+5}Q{left+2} {y+2} {left} {y+2}Z'
    markup += f'<path d="{path}" fill="{colors["frame"]}" data-notch="edge-attached"/>'
    markup += font.text('9:41', x + 5, y + 10, 4.5, ink, 'body')
    for index_bar, bar_height in enumerate((1.6, 2.4, 3.2)):
        markup += rect(x + width - 19 + index_bar * 1.6, y + 8.5 - bar_height, 1, bar_height, ink, .2)
    markup += rect(x + width - 10.8, y + 5, 6.8, 3.6, 'none', .8, ink, .4)
    markup += rect(x + width - 10.1, y + 5.7, 5.4, 2.2, ink, .3)
    markup += rect(x + width - 3.6, y + 6, .6, 1.6, ink, .2)
    return markup


def frame(x, y, width, height, config):
    return rect(x + .6, y + .6, width - 1.2, height - 1.2, 'none', config['notch']['corner_radius'], config['colors']['frame'], 1.2)
