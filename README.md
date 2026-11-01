# 彭宇康 — 深林纸雕作品集

一个从零搭建的动漫制作设计学生作品集。React + Vite 单页结构，PC 优先，版心约 1700px。视觉方向是**明亮、层叠的立体纸雕深林**：首页是男孩与白兔坐在溪边岩石上的大幅林间画面，画面本身保持不动，前景树叶随滚轮向两侧让开；下方接奶油色关于纸带、深色拍立得项目墙，以及带树洞与睡狐的纸雕收尾页。

> 当前版本已接入彭宇康的真实项目：苗阿岭 IP 形象、非遗主题动画、灵墟绘卷游戏 UI、短片创作与星星罐子。姓名、学校、邮箱、微信与所在地均按本人信息更新；首页森林画仍为 AI 概念图，正式发布前可替换为实拍或自制主视觉。

## 启动

要求 Node.js 20.19+（本项目使用 Node 24）。

```bash
pnpm install
pnpm dev
```

打开 `http://127.0.0.1:5173`。

生产构建与预览：

```bash
pnpm build
pnpm preview
```

打开 `http://127.0.0.1:4173`。

部署到公网、让别人长期访问：见 [DEPLOY.md](./DEPLOY.md)。推荐 GitHub Pages，仓库名使用 `kupuyu.github.io`，上线地址为 `https://kupuyu.github.io/`。

## 电脑重启后打开

- **本地预览**：双击项目根目录的 `启动本地预览.cmd`，等几秒浏览器会自动打开。地址是 `http://127.0.0.1:5173/`。这个地址只在当前电脑有效，电脑关机就会停止。
- **让别人随时访问**：按 [DEPLOY.md](./DEPLOY.md) 部署到 GitHub Pages，得到一个真正的公网网址；之后电脑关不关机都能打开。

## 页面结构

1. **Hero** — 200svh 粘性纸雕舞台：男孩、白兔与溪边岩石保持固定，前景树冠与两侧纸叶随滚动让开；奶油手写标题与下方内容在 About 覆盖前保持可见
2. **关于我** — 深林背景中的奶油撕纸纸带；左侧肖像卡与姓名，中间手写标题与简介，右侧学习年限、课程项目两项数据
3. **精选项目** — 深绿纸展厅：左侧标题与「查看作品集」，右侧五张倾斜的奶油拍立得项目卡；横向吸附滚动、左右切换，点击打开可翻图集 / 播放短片的项目详情弹层
4. **联系我** — 整屏纸雕收尾页：树洞与睡着的狐狸、灯、兔子、蘑菇、珠海时间、联系与教育信息，底部奶油色页脚

## 修改内容

身份、项目、导航与页脚文案都集中在 `src/data/content.js`：

- `profile`：姓名、身份、学校、邮箱、微信、所在地、简介、实习状态
- `stats`：学习年限与课程项目两项数据
- `projects`：项目标题、分类、年份、封面图、描述、职责与时长
- `navItems` / `footerLinks`：导航与页脚链接

页面标题、导航锚点和 SEO 文案在：

- `index.html` — 页面 title、description、OG 信息
- `src/components/HeroSection.jsx` — 首屏标题与副文案
- `src/components/AboutSection.jsx` — 关于页标题
- `src/components/ProjectsSection.jsx` — 精选项目标题
- `src/components/ContactFooter.jsx` — 收尾页标题与联系信息

### 替换图片

- 首页深林主视觉：`public/images/generated/forest/hero-forest.jpg`（2400×1085，宽幅）
- 项目封面：`public/images/portfolio/{miao,heritage,lingxu,shortfilm,starjar}/cover.jpg`（4:5，1000×1250）
- 项目图集：同名目录下的 `01.jpg`、`02.jpg`……，可在 `content.js` 的 `gallery` 数组中调整顺序或增删
- 项目视频：`public/videos/portfolio/heritage.mp4`、`shortfilm.mp4`、`starjar.mp4`；在 `content.js` 的 `video` 字段引用

替换时保持同名文件即可，不需要改代码。首页主视觉建议使用 2400px 或更大的宽幅图片，并保留右侧人物、左侧标题留白的构图。

## 设计系统

- **字体**：ZCOOL KuaiLe（中文手写标题）、Caveat（英文手写标签）、Manrope（界面小字）通过 `@fontsource` 本地加载；正文优先使用系统安装的 Noto Serif SC，缺失时回退到 Songti SC / serif。不依赖外部 CDN
- **颜色**：纸 `#f2eee3`、纸深 `#e8e3d7`、深林 `#1b2c1b`、最深林 `#101c12`、苔藓 `#526c3e`、嫩叶 `#a9bd7e`、墨 `#20301d`、奶油 `#f8f2df`
- **版心**：`--container: 1700px`，桌面 gutter 最大 86px
- **纸感**：`public/images/grain.png` 颗粒叠层、CSS 纸纹、SVG `feTurbulence` 撕纸边缘、`feDropShadow` 分层阴影
- **纸雕插画**：`src/components/ForestFoliage.jsx`（首页边缘纸叶）、`src/components/PaperScene.jsx`（小鹿、飞鸟、树冠、叶子）与 `src/components/PaperArt.jsx`（撕纸边、蕨类、蘑菇、树洞、狐狸）全部为内联 SVG
- **动效**：首页滚轮视差、纸叶层错峰退场、滚动显现、纸牌轻摆、木牌摇晃、蝴蝶与萤火虫、项目横向吸附与弹层；全部支持 `prefers-reduced-motion`
- **可访问性**：跳转主内容链接、焦点样式、弹层焦点管理 / Escape 关闭、可复制微信号、语义化标题层级

## 目录

```
portfolio/
├─ public/
│  ├─ images/
│  │  ├─ generated/forest/ # 首页深林主视觉
│  │  ├─ portfolio/        # 五个真实项目的封面与图集
│  │  └─ grain.png         # 纸张颗粒
│  ├─ videos/portfolio/    # 三个项目的短片
│  └─ favicon.svg
├─ src/
│  ├─ components/
│  │  ├─ SiteHeader.jsx
│  │  ├─ HeroSection.jsx
│  │  ├─ AboutSection.jsx
│  │  ├─ ProjectsSection.jsx
│  │  ├─ ContactFooter.jsx
│  │  ├─ ForestFoliage.jsx # 首页边缘纸叶层
│  │  ├─ PaperScene.jsx   # 少年、兔子、木牌、小鹿、飞鸟、树冠、叶子
│  │  ├─ PaperArt.jsx     # 撕纸边、蕨类、兔子、蘑菇、树洞、狐狸
│  │  ├─ Icons.jsx
│  │  ├─ CopyValue.jsx
│  │  └─ Reveal.jsx
│  ├─ data/content.js
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ site-v2.css
│  └─ forest-hero.css
├─ scripts/               # 资产生成、裁切与视觉 QA（开发用）
├─ index.html
└─ vite.config.js
```

## 开发脚本

> 视觉 QA 脚本需要额外安装 `playwright-core`，并调用本机 Microsoft Edge：`pnpm add -D playwright-core`。

```bash
# 重新生成 AI 概念图（Pollinations 免费接口，1 张 / 45 秒）
node scripts/generate_papercut_v2.mjs

# 裁边、调色、压纸纹，输出最终 JPG
python scripts/process_v2_assets.py

# 浏览器视觉回归（需要本机安装 Edge）
node scripts/qa-site.mjs       # 1920 / 1440 / 1366 / 1280 / 390 截图
node scripts/qa-final.mjs      # 导航、复制、弹层、手机菜单、reduced motion
node scripts/qa-v2-metrics.mjs # 联系区与页脚几何检查
```

QA 截图只在本地验收时临时生成，不参与构建。

## 素材说明

首页森林主视觉与纸雕小鹿、飞鸟等插画为 AI 概念图或本项目内联 SVG；五个项目的封面、图集与短片来自彭宇康的作品文件。正式发布前请补充每个项目更准确的职责、年份与创作过程，并按需替换首页主视觉。字体使用开源字体；纸雕小物、图标和撕纸边缘均为本项目内联 SVG。
