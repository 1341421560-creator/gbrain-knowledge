"""复用原有字体，补充同字体粗体与准确的排版宽度。"""
from fontTools.varLib.instancer import instantiateVariableFont
from .vector import Typography


class LayoutTypography(Typography):
    def __init__(self, root):
        super().__init__(root)
        self.fonts['body_bold'] = instantiateVariableFont(self.fonts['body'], {'wght': 700}, inplace=False)

    def width(self, value, size, kind='body'):
        scale = size / self.fonts[kind]['head'].unitsPerEm
        return sum(self.glyph(kind, char)[1] for char in value) * scale
