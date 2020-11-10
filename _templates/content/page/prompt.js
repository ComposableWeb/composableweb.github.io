const slugify = require('slugify');

module.exports = {
  prompt: ({ prompter }) => {
    return new Promise((resolve) => {
      prompter
        .prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Title?',
          },
        ])
        .then(({ title }) => {
          const date = new Date().toISOString().split('T')[0];
          const slug = slugify(title, { locale: 'en', lower: true });
          resolve({
            slug,
            title,
            date,
          });
        });
    });
  },
};
