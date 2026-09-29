# Bokun Zheng — Portfolio

This repository contains my personal research and engineering portfolio, built with Hugo and deployed at [zzzzzbk.github.io](https://zzzzzbk.github.io/).

## Preview the website locally

### 1. Install the required tools

The site uses:

- [Hugo Extended](https://gohugo.io/installation/) version **0.162.0**
- [Node.js](https://nodejs.org/) version **22**
- [pnpm](https://pnpm.io/installation) version **10**
- [Go](https://go.dev/doc/install), used to download the Hugo modules

After installing them, open PowerShell in this repository and verify the commands are available:

```powershell
hugo version
node --version
pnpm --version
go version
```

The Hugo output should include both `v0.162.0` and `extended`.

### 2. Install the website dependencies

Run this once after cloning the repository, or whenever `package.json` or `pnpm-lock.yaml` changes:

```powershell
pnpm install
```

### 3. Synchronize the portfolio content

The editable portfolio data lives in `data/portfolio.json`. Generate the corresponding Hugo content pages before starting the preview:

```powershell
pnpm run sync:portfolio
```

Do this before starting Hugo. Rewriting all generated content while Hugo is watching the files can make the development server unstable.

### 4. Start the local preview

```powershell
pnpm run dev
```

Open [http://localhost:1313/](http://localhost:1313/) in your browser. Hugo watches the source files and refreshes the site after normal edits.

If port 1313 is already being used, start Hugo on another port:

```powershell
hugo server --disableFastRender --port 1314
```

Then open [http://localhost:1314/](http://localhost:1314/).

Press `Ctrl+C` in PowerShell to stop the preview server.

## Normal editing workflow

1. Edit portfolio text and entries in `data/portfolio.json`.
2. Add original images or videos to `assets/media` and web-ready files to `static/media`.
3. Run `pnpm run sync:portfolio` if you added an entry or changed a slug.
4. Start or restart the preview with `pnpm run dev`.

The main files for visual changes are:

- `layouts/_partials/portfolio/page.html` — page structure
- `layouts/_partials/portfolio/card.html` — research and project cards
- `assets/css/portfolio.css` — styling and responsive layout
- `assets/js/portfolio.js` — navigation, filters, and media behavior

## Test a production build

Before pushing a larger change, run:

```powershell
pnpm run sync:portfolio
hugo --minify --cleanDestinationDir
pnpm run pagefind
pnpm run check:site
```

The generated website is written to `public/`. That directory is ignored by Git because GitHub Actions rebuilds it during deployment.

`check:site` verifies internal links and assets, confirms starter content is excluded, and checks that every HTML page contains the site's `noindex` directive.

## Deployment

Pushing to the `main` branch triggers `.github/workflows/deploy.yml`. GitHub Actions builds the site and publishes it to [https://zzzzzbk.github.io/](https://zzzzzbk.github.io/).

The public site intentionally includes `<meta name="robots" content="noindex">`, so search engines are asked not to show it in search results. Direct links continue to work normally.

## Troubleshooting

If PowerShell says `hugo` is not recognized, install Hugo Extended and restart PowerShell so the updated `PATH` is loaded.

If dependencies are missing or Pagefind fails, run:

```powershell
pnpm install
```

If the preview shows old content after running the synchronization command, stop Hugo with `Ctrl+C` and start it again.
