import tempfile
from pathlib import Path

work = Path(r'E:\deepseek文件\portfolio')
temp = work / '.tmp'
temp.mkdir(exist_ok=True)
tempfile.tempdir = str(temp)

from pip._internal.cli.main import main

raise SystemExit(main([
    'install', '--no-cache-dir', '--target', str(work / '.py-libs'),
    'opencv-contrib-python-headless',
]))
