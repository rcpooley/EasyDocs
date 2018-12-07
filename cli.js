#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const generate = require('./generate');
const Bundler = require('parcel-bundler');

const REACT_DIR = path.join(__dirname, 'react_src');
const REACT_CONTENT_DIR = path.join(REACT_DIR, 'content');
const REACT_ENTRY_POINT = path.join(REACT_DIR, 'index.html');

// Make sure we have the correct arguments
const args = process.argv.slice(2);
if (args.length < 1) {
    console.log('Usage: easydocs [contentDir] (generatedDir)');
    process.exit();
}

// Make sure the content directory exists
const contentDir = path.resolve(process.cwd(), args[0]);
if (!fs.existsSync(contentDir)) {
    console.log(`Directory not found: ${contentDir}`);
    process.exit(0);
}

// Get the generated directory
const generatedDir = path.resolve(process.cwd(), args[1] || 'generated');

// Make sure it's not a file
const contentDirStat = fs.lstatSync(contentDir);
if (!contentDirStat.isDirectory()) {
    console.log(`${args[0]} is not a directory`);
    process.exit(0);
}

generate(contentDir, REACT_CONTENT_DIR, () => {
    const bundler = new Bundler(REACT_ENTRY_POINT, {
        outDir: generatedDir,
        outFile: 'index.html',
        publicUrl: './',
        watch: false,
        cache: false,
        minify: true,
        target: 'browser',
        sourceMaps: false
    });
    bundler.bundle()
        .then(() => console.log(`Wrote to ${generatedDir}`))
        .catch((err) => console.error(err));
});
