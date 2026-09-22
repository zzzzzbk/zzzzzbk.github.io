# Editing the portfolio

The site uses Hugo with local portfolio layouts. The existing Hugo Blox modules remain available, and the GitHub Pages build still uses the pinned Hugo version in `hugoblox.yaml`.

- Edit copy, skill groups, research, projects, and experience in `data/portfolio.json`.
- Research entries with `featured: true` appear on Home; all entries appear on Research. Publications and expandable presentation summaries are on Research only. Presentation summaries are editorial descriptions, not official submitted abstracts.
- After adding entries or changing slugs, run `node scripts/sync-portfolio.mjs` to update the Hugo routes.
- The main layout is `layouts/_partials/portfolio/page.html`; shared cards are in `layouts/_partials/portfolio/card.html`.
- Styles and browser behavior are in `assets/css/portfolio.css` and `assets/js/portfolio.js`.
- Original media remains in `assets/media`. Web-ready videos, posters, and illustrations live in `static/media`.
- Resume downloads use `static/uploads/Bokun_Zheng_Resume_master.docx`. The older template PDF is not linked.
- Starter examples are retained as drafts and excluded from production output.

## Content provenance

Portfolio copy is based on the supplied master resume. The origami paper's title, DOI, and three equal contributors were checked against the published PDF at https://naughtonlab.org/pubs/2026_AdvSci.pdf. The two unpublished research topics are explicitly labeled and described at a high level. The drone weight reduction remains an objective, not a claimed result. No skill scores or unsupported credentials are displayed.

Original videos show the octopus arm, full-body octopus simulator, and multi-tentacle gripper. The GUI screenshot and capture-system rendering were supplied by the owner. AI illustrations are labeled as concepts, not project evidence.

The bat animation comes from `assets/media/bat.mp4`, cropped to 320×300 at (164,94) after checking the motion bounds across all frames. `arm-reaching.mp4` rotates the previous `arm-horizontal.mp4` by another 180 degrees. The cockroach-inspired study uses Figure 1 from the author preprint at https://arxiv.org/abs/2112.09075, with attribution and a DOI link. The sensor illustration uses three radial beam flexures; its generation prompt is saved in `assets/media/concepts/force-torque-sensor-v2-prompt.md`.

## Build and preview

Use Hugo 0.162.0 extended and the repository's Node dependencies. Run `hugo --minify`, then `npm run pagefind` and `npm run check:site`. Preview with `hugo server --disableFastRender`. Run the content sync before starting the preview; the pinned Hugo version can crash while watching a batch rewrite of content. A stable preview can use `hugo server --watch=false` and be restarted after edits.

The deployment workflow sets the production base URL from GitHub Pages. The local default is the repository-derived `https://zzzzzbk.github.io/website/`; update it if using a custom domain. For a different URL prefix, pass it to the check: `node scripts/check-site.mjs public /your-prefix/`.
