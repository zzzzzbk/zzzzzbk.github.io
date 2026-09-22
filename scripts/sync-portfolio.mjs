// Generate Hugo content routes from the editable portfolio data.
// Run after changing a project/research slug or adding an entry.
import fs from 'node:fs';
import path from 'node:path';
const data = JSON.parse(fs.readFileSync('data/portfolio.json', 'utf8'));
function writePage(file, meta, content = '') {
  if (file.startsWith('content/publications/')) meta.build = { publishResources: false };
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const output = `${JSON.stringify(meta, null, 2)}${content ? `\n\n${content}` : ''}\n`;
  if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== output) fs.writeFileSync(file, output);
}
writePage('content/_index.md', { title: 'Bokun Zheng', type: 'portfolio', view: 'home', description: data.intro });
for (const section of ['research', 'projects']) {
  writePage(`content/${section}/_index.md`, { title: section === 'research' ? 'Research' : 'Projects', type: 'portfolio', view: section });
  for (const item of data[section]) {
    writePage(`content/${section}/${item.slug}/index.md`, { title: item.title, type: 'portfolio', view: 'detail', group: section, item: item.slug, description: item.summary, summary: item.summary }, item.detail);
  }
}
writePage('content/experience.md', { title: 'Experience & Education', type: 'portfolio', view: 'experience' });
writePage('content/publications/_index.md', { title: 'Selected Publications', type: 'portfolio', view: 'publications' });
writePage('content/publications/conference-paper/index.md', { title: data.publications[0].title, type: 'portfolio', view: 'article' }, `**${data.publications[0].venue}**\n\n${data.publications[0].authors}\n\n${data.publications[0].note}\n\n${data.research[1].summary}\n\n[Read the paper (PDF)](${data.publications[0].pdf}) · [DOI](${data.publications[0].url}) · [Research overview](../../research/origami-tentacles/)`);
writePage('content/publications/journal-article/index.md', { title: data.publications[1].title, type: 'portfolio', view: 'article' }, `**${data.publications[1].venue}**\n\n${data.publications[1].authors}\n\n${data.research.find(item => item.slug === 'cockroach-obstacle-traversal').summary}\n\n[Read the paper (author preprint)](${data.publications[1].pdf}) · [DOI](${data.publications[1].url}) · [Research overview](../../research/cockroach-obstacle-traversal/)`);
writePage('content/publications/preprint/index.md', { title: 'Fiber-reinforced mechanical intelligence simplifies octopus arm reaching control', type: 'portfolio', view: 'article' }, '**Unpublished — manuscript prepared for submission.**\n\nBokun Zheng and Noel Naughton.\n\nThis work investigates how muscle coordination and fibrous tissue mechanics contribute to stiffening during octopus arm reaching.\n\n[Research overview](../../research/octopus-biomechanics/)');
// Preserve starter examples on disk, but exclude them from production and search.
for (const directory of ['blog', 'courses', 'events', 'slides', 'authors', 'projects/pandas', 'projects/pytorch', 'projects/scikit']) {
  const visit = dir => {
    for (const file of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, file.name);
      if (file.isDirectory()) visit(full);
      else if (file.name.endsWith('.md')) {
        const source = fs.readFileSync(full, 'utf8');
        if (source.startsWith('---') && !/^draft: true$/m.test(source)) fs.writeFileSync(full, source.replace(/^---\r?\n/, '---\ndraft: true\n'));
      }
    }
  };
  if (fs.existsSync(`content/${directory}`)) visit(`content/${directory}`);
}

