"""SVG 图形与已授权字体轮廓。"""
import base64
import html
from functools import lru_cache
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

def rect(x,y,w,h,fill,r=0,stroke=None,sw=1):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}"'+(f' stroke="{stroke}" stroke-width="{sw}"' if stroke else '')+'/>'

def line(x1,y1,x2,y2,color,width=1):
    return f'<path d="M{x1} {y1}L{x2} {y2}" stroke="{color}" stroke-width="{width}" fill="none"/>'

def image_uri(file):
    suffix=Path(file).suffix.lower()
    kind='jpeg' if suffix in ('.jpg','.jpeg') else 'png'
    return 'data:image/'+kind+';base64,'+base64.b64encode(Path(file).read_bytes()).decode('ascii')

class Typography:
    def __init__(self,root):
        self.fonts={key:TTFont(root/name) for key,name in {'heading':'Poppins-Bold.ttf','label':'Poppins-Medium.ttf','body':'Roboto.ttf'}.items()}

    @lru_cache(maxsize=2048)
    def glyph(self,kind,char):
        font=self.fonts[kind]
        name=font.getBestCmap().get(ord(char),'space')
        glyphs=font.getGlyphSet()
        pen=SVGPathPen(glyphs)
        glyphs[name].draw(pen)
        return pen.getCommands(),font['hmtx'][name][0]

    def text(self,value,x,y,size,color,kind='body',anchor='start',spacing=0):
        scale=size/self.fonts[kind]['head'].unitsPerEm
        glyphs=[self.glyph(kind,char) for char in value]
        width=sum(g[1]*scale for g in glyphs)+max(0,len(glyphs)-1)*spacing
        start=x-width/2 if anchor=='middle' else x-width if anchor=='end' else x
        out=[]
        for commands,advance in glyphs:
            out.append(f'<path d="{commands}" transform="translate({start:.4f} {y}) scale({scale:.7f} {-scale:.7f})"/>')
            start+=advance*scale+spacing
        return f'<g fill="{color}" aria-label="{html.escape(value,quote=True)}">'+''.join(out)+'</g>'

def status(x,y,r,color,compatible):
    d='M-0.44 0L-0.11 0.32L0.47 -0.34' if compatible else 'M-0.29 -0.29L0.29 0.29M0.29 -0.29L-0.29 0.29'
    return f'<g transform="translate({x} {y})"><circle r="{r}" fill="{color}"/><path d="{d}" transform="scale({r})" fill="none" stroke="white" stroke-width=".19" stroke-linecap="round" stroke-linejoin="round"/></g>'
