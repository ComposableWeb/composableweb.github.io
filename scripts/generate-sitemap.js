const fs = require('fs');
const fg = require('fast-glob');
const prettier = require('prettier');

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettier.config.js');
  const directories = await fg(`**`, { onlyDirectories: true, cwd: './content', deep: 1 });
  const posts = await Promise.all(
    directories.map((dir) =>
      fg(`${dir}/*.{md,mdx}`, { onlyFiles: true, cwd: './content', deep: 1 }).then((paths) =>
        paths.map((path) => ({
          path,
          dir,
        }))
      )
    )
  );
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url>
              <loc>https://composableweb.com</loc>
          </url>
          <url>
              <loc>https://composableweb.com/resume/en</loc>
          </url>
          <url>
              <loc>https://composableweb.com/resume/de</loc>
          </url>
          ${directories
            .map((page) => {
              return `
                      <url>
                          <loc>${`https://composableweb.com/${page}`}</loc>
                      </url>
                  `;
            })
            .join('')}
          ${posts
            .flat()
            .map((page) => {
              return `
                      <url>
                          <loc>${`https://composableweb.com/${page.path.split('.').slice(0, -1).join('.')}`}</loc>
                      </url>
                  `;
            })
            .join('')}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted);
})();
