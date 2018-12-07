const path = require('path');
const rimraf = require('rimraf');
const Bundler = require('parcel-bundler');

const BUILD_DIR = 'react_dist';
const REACT_ENTRY_POINT = path.join(__dirname, 'react_src', 'index.html');

rimraf(BUILD_DIR, () => {
    const bundler = new Bundler(REACT_ENTRY_POINT, {
        outDir: BUILD_DIR,
        outFile: 'index.html',
        publicUrl: './',
        watch: false,
        cache: true,
        minify: true,
        target: 'browser',
        sourceMaps: false
    });
    bundler.bundle()
        .then(() => console.log(`Wrote to ${BUILD_DIR}`))
        .catch((err) => console.error(err));
});
