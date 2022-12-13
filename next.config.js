const withCustomTranspile = require('next-transpile-modules')([
	'@fullcalendar/common',
	'@fullcalendar/react',
	'@fullcalendar/daygrid',
	'@fullcalendar/list',
	'@fullcalendar/timegrid',
	'react-data-grid',
]);
const withImages = require('next-images');
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */

module.exports = withImages(
	withCustomTranspile({
		i18n,
		output: 'standalone',
		webpack(config) {
			config.module.rules.push({
				test: /\.worker\.js$/,
				loader: 'worker-loader',
				options: {
					filename: 'static/workers/[fullhash].worker.js',
					publicPath: '/_next/',
					// inline: 'no-fallback',
					// fallback: false,
					// name: '[name].[contenthash].js',
					// chunkFilename: 'static/chunks/[id].[contenthash].js',
					// esModule: false,
				},
			});

			return config;
		},
	})
);
