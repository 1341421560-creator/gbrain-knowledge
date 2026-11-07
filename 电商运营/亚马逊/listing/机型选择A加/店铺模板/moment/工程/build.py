"""装配已确认版式、刘海参数与点击放大配置。"""
import argparse
import json
import os
from pathlib import Path
from modules.typography import LayoutTypography
from modules.revision import build


def main():
    parser = argparse.ArgumentParser(description='复现 moment 普通 A+，将成品写入指定项目输出目录。')
    parser.add_argument('--output', required=True, help='相对于当前工作目录的 SVG 输出路径。')
    args = parser.parse_args()
    root = Path(__file__).resolve().parent
    config = json.loads((root / 'config.json').read_text(encoding='utf-8'))
    target = Path(args.output).resolve()
    config['output_svg'] = os.path.relpath(target, root)
    font = LayoutTypography(root / 'assets/fonts')
    print(build(root, config, font).name)


if __name__ == '__main__':
    main()
