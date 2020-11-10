module.exports = {
  ci: {
    collect: {
      /* Add configuration here */
      startServerCommand: 'npm run build && npm run start',
      url: ['http://localhost:3000'],
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      /* Add configuration here */
      target: 'temporary-public-storage',
    },
  },
};
