"""只放大目标图标和字段，保持整机尺寸不变。"""
from .vector import rect


def icon(source, crop, placement):
    x, y, size = placement
    box = ' '.join(str(value) for value in crop)
    viewport = f'<svg x="{x}" y="{y}" width="{size}" height="{size}" viewBox="{box}" overflow="hidden"><use href="#{source}"/></svg>'
    if source == 'tap-settings-source':
        # 沿图标自身圆角裁取，避免带出主屏幕壁纸的角落。
        return f'<defs><clipPath id="settings-app-icon-clip">{rect(x,y,size,size,"#FFFFFF",15.5)}</clipPath></defs><g clip-path="url(#settings-app-icon-clip)">{viewport}</g>'
    return viewport


def popup_box(setting, config):
    x, y, width, height = setting['box']
    return rect(x, y, width, height, config['colors']['white'], 9, config['colors']['blue'], 1.6)


def settings(config, font):
    setting, colors = config['settings_zoom'], config['colors']
    markup = popup_box(setting, config)
    markup += icon('tap-settings-source', config['settings_icon_crop'], setting['icon'])
    markup += font.text(setting['label'], setting['label_center_x'], setting['label_baseline'], setting['label_size'], colors['ink'], 'label', 'middle')
    return markup


def selected_row(setting, config, font, with_icon=False):
    colors = config['colors']
    x, y, width, height = setting['box']
    markup = popup_box(setting, config)
    if with_icon:
        markup += icon('tap-general-source', config['general_icon_crop'], setting['icon'])
    markup += font.text(setting['label'], setting['label_x'], setting['label_baseline'], setting['label_size'], colors['ink'], 'body')
    if setting['chevron']:
        markup += font.text('›', x + width - 9, y + height / 2 + 5, 17, colors['muted'], 'body', 'middle')
    return markup


def model(config, font):
    setting, colors = config['model_zoom'], config['colors']
    markup = popup_box(setting, config)
    markup += font.text(setting['label'], setting['label_center_x'], setting['label_baseline'], setting['label_size'], colors['ink'], 'body', 'middle')
    markup += font.text(setting['value'], setting['label_center_x'], setting['value_baseline'], setting['value_size'], colors['blue'], 'body_bold', 'middle')
    return markup


def overlays(config, font):
    return [settings(config, font), selected_row(config['general_zoom'], config, font, True), selected_row(config['about_zoom'], config, font), model(config, font)]
