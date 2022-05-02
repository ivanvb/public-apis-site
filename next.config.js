const withPreact = require('next-plugin-preact');

/** @type {import('next').NextConfig} */
const nextConfig = withPreact({
    reactStrictMode: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.csv$/,
            loader: 'csv-loader',
            options: {
                dynamicTyping: false,
                header: false,
                skipEmptyLines: true,
            },
        });

        return config;
    },
});

module.exports = nextConfig;
