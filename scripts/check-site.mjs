// Check production links/assets at the configured GitHub Pages path.
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(process.argv[2] || 'public');
const prefix = process.argv[3] || '/';
const origin = 'https://zzzzzbk.github.io';
const htmlFiles = fs.readdirSync(root, { recursive: true }).filter(f => f.endsWith('.html'));
const failures = [];
let checked = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const noindex = html.match(/<meta\b[^>]*\bname=(?:"robots"|'robots'|robots)[^>]*\bcontent=(?:"noindex"|'noindex'|noindex)[^>]*>/gi) || [];
  if (noindex.length !== 1) failures.push(`${file}: expected one robots noindex directive, found ${noindex.length}`);
  const pageURL = new URL(prefix + file.replaceAll('\\', '/').replace(/index\.html$/, ''), origin);
  for (const match of html.matchAll(/\b(?:href|src|poster)=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    const value = (match[1] ?? match[2] ?? match[3]).replaceAll('&amp;', '&');
    if (/^(mailto:|tel:|data:|javascript:)/.test(value)) continue;
    const url = new URL(value, pageURL);
    if (url.origin !== origin) continue;
    checked++;
    if (!url.pathname.startsWith(prefix)) { failures.push(`${file}: outside base path: ${value}`); continue; }
    let target = path.join(root, decodeURIComponent(url.pathname.slice(prefix.length)));
    if (url.pathname.endsWith('/')) target = path.join(target, 'index.html');
    if (!fs.existsSync(target)) { failures.push(`${file}: missing ${value}`); continue; }
    if (url.hash && target.endsWith('.html')) {
      const targetHTML = fs.readFileSync(target, 'utf8');
      const ids = [...targetHTML.matchAll(/\bid=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/g)].map(m => m[1] ?? m[2] ?? m[3]);
      if (!ids.includes(decodeURIComponent(url.hash.slice(1)))) failures.push(`${file}: missing anchor ${value}`);
    }
  }
  if (/Build your own academic website|Lorem ipsum|Alice Smith/.test(html)) failures.push(`${file}: starter content leaked`);
}
for (const section of ['blog', 'courses', 'events', 'notes', 'slides', 'projects/pandas', 'projects/scikit', 'projects/pytorch']) {
  if (fs.existsSync(path.join(root, section, 'index.html'))) failures.push(`Unexpected starter/private section: ${section}`);
}
if (fs.existsSync(path.join(root, 'sitemap.xml'))) failures.push('Unexpected sitemap.xml: sitemap should remain disabled while the site is noindex');
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`Passed: ${htmlFiles.length} pages, ${checked} internal links/assets, base path ${prefix}, no starter/private sections.`);
