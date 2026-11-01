# 把作品集发布到公网

这是一个纯静态的前端项目，没有数据库和服务器端程序。构建后只有 HTML、CSS、JS、图片和视频，最适合放在静态托管平台。

**推荐路线：GitHub 保存源码 + Vercel 自动构建。** 免费、自动 HTTPS，每次改完 push 到 GitHub 就会自动更新网站，不需要自己维护服务器。

---

## 方案一：GitHub + Vercel（推荐）

### 1. 把项目放到 GitHub

最简单的方法是用 GitHub Desktop：

1. 注册 / 登录 [github.com](https://github.com)。
2. 安装 [GitHub Desktop](https://desktop.github.com/)。
3. `File → Add local repository`，选择本目录：
   `E:\deepseek文件\portfolio`
4. 如果提示不是 Git 仓库，选择 `create a repository`。
5. 左下角填写提交信息，点击 `Commit to main`。
6. 点击上方 `Publish repository`。
   - 名字建议：`peng-yukang-portfolio`
   - 不想公开源码可以勾选 `Keep this code private`。Vercel 仍可读取私有仓库。

不要提交 `node_modules`、`dist`、`qa` 和 `design`。项目里的 `.gitignore` 已经排除它们。

### 2. 用 Vercel 部署

1. 打开 [vercel.com](https://vercel.com)，用 GitHub 账号登录。
2. 点击 `Add New… → Project`，选择刚发布的仓库。
3. 配置保持默认即可，Vercel 会自动识别 Vite：
   - Framework Preset：`Vite`
   - Build Command：`pnpm build`
   - Output Directory：`dist`
4. 点击 `Deploy`，等待约 1 分钟。

部署成功后会得到一个类似下面的地址：

```text
https://peng-yukang-portfolio.vercel.app
```

这个地址就是别人可以打开的正式网站。以后在本地改完代码，提交并 push 到 GitHub，Vercel 会自动重新部署。

### 3. 想要更像个人网站，可以绑定自己的域名

- 在 Namecheap、Cloudflare、阿里云、腾讯云等注册一个域名，例如 `pengyukang.com`。
- 在 Vercel 项目的 `Settings → Domains` 添加域名。
- 按提示到域名服务商添加 DNS 记录。
- Vercel 会自动签发 HTTPS 证书。

域名通常几十到一百元一年，需要记得续费。免费的子域名 `*.vercel.app` 也完全可以先用来投递作品集。

---

## 方案二：Netlify 直接拖拽上传（最快，不需要 GitHub）

项目已经构建好，`dist/` 就是可以部署的成品。

1. 打开 [app.netlify.com/drop](https://app.netlify.com/drop) 并登录。
2. 把 `E:\deepseek文件\portfolio\dist` 文件夹直接拖进页面。
3. 得到 `https://随机名字.netlify.app` 地址。
4. 在站点设置里可以改名字，例如 `peng-yukang.netlify.app`。

优点是不用配置；缺点是以后更新内容后，需要重新拖一次新的 `dist`，不像 Vercel 那样自动更新。

项目里的 `netlify.toml` 也已经配置好：

- Build command：`pnpm build`
- Publish directory：`dist`

如果你选择连接 Git 仓库，Netlify 也能自动部署。

---

## 方案三：Cloudflare Pages

适合想要免费、稳定、全球访问的方案：

1. 登录 [pages.cloudflare.com](https://pages.cloudflare.com)。
2. 连接 GitHub 仓库。
3. 构建设置：
   - Framework preset：`Vite`
   - Build command：`pnpm build`
   - Build output directory：`dist`
4. 部署后会得到 `*.pages.dev` 地址，也可以绑定域名。

---

## 如果主要给中国大陆的访客看

Vercel 的默认域名在中国大陆可能访问不稳定，甚至间歇性打不开。这不是代码问题，是网络线路问题。

更稳的国内路线：

1. **腾讯云 COS / 阿里云 OSS 静态网站托管**：把 `dist` 上传到桶里，开启静态网站。
2. 绑定自己的域名。
3. 如果使用中国大陆节点和自定义域名，通常需要完成 ICP 备案；香港节点一般不需要备案，但速度略慢。
4. 加 CDN 后访问会更快。

如果只是投递作品集、给招聘方或老师看，Vercel / Netlify 的免费地址通常已经够用；建议先上线，再根据访问情况决定要不要备案和买国内服务。

---

## 怎么做到“不会丢”

没有任何免费平台能承诺永久不删，但可以做到实际上的长期稳定：

1. **源码放 GitHub**，不要只留在本机临时目录。
2. **平台自动部署**，不要依赖临时预览服务（例如当前本机的 `http://127.0.0.1:5173`，只在这台电脑运行时有效）。
3. **保留一份 ZIP 备份**：源码、`dist`、作品原图分别留一份。
4. **域名及时续费**，并开启自动续费。
5. 平台账号开启双重验证，避免账号丢失。

当前项目已准备好：

- `dist/`：可直接部署的生产版本
- `netlify.toml`：Netlify 构建配置
- `.nvmrc`：Node 22
- `.gitignore`：不会把依赖、构建产物和临时 QA 文件提交上去

---

## 上线后需要替换的占位内容

正式发布前，记得修改：

- `src/data/content.js`：学校、邮箱、微信、项目信息
- `public/images/generated/v2/`：四张项目封面和首页静帧
- `public/videos/hero-forest-v2.mp4`：首页视频

当前图片和视频是概念素材，正式投递时最好换成自己的真实作品。
