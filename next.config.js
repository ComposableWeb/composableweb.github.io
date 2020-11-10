const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        /* config for next-optimized-images */
        responsive: {
          adapter: require('responsive-loader/sharp'),
        },
      },
    ],
    withBundleAnalyzer,

    // your other plugins here
  ],
  {
    // next core options
    pageExtensions: ['ts', 'tsx'],
    images: {
      deviceSizes: [480, 768, 992, 1280],
    },
  }
);
