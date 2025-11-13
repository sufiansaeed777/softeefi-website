const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  devServer: {
    allowedHosts: 'all'
  },
  eslint: {
    enable: true,
    mode: 'extends'
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Add compression for production builds
      if (env === 'production') {
        webpackConfig.plugins.push(
          new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg|json)$/,
            threshold: 8192, // Only compress files larger than 8kb
            minRatio: 0.8,
          })
        );

        // Add Brotli compression for better compression ratio
        webpackConfig.plugins.push(
          new CompressionPlugin({
            filename: '[path][base].br',
            algorithm: 'brotliCompress',
            test: /\.(js|css|html|svg|json)$/,
            compressionOptions: {
              level: 11,
            },
            threshold: 8192,
            minRatio: 0.8,
          })
        );
      }

      // Optimize chunking
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              reuseExistingChunk: true,
            },
            common: {
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
            },
            // Separate large libraries
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom|react-router)[\\/]/,
              name: 'react-vendor',
              priority: 20,
            },
            framerMotion: {
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              name: 'framer-motion',
              priority: 15,
            },
            three: {
              test: /[\\/]node_modules[\\/](three)[\\/]/,
              name: 'three-vendor',
              priority: 15,
            },
          },
        },
      };

      // Add bundle analyzer in analyze mode
      if (process.env.ANALYZE === 'true') {
        webpackConfig.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundle-report.html',
            openAnalyzer: false,
          })
        );
      }

      return webpackConfig;
    },
  },
};