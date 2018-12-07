#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const markdown = require('markdown').markdown;

const REACT_DIR = path.join(__dirname, 'react_dist');
const INJECT_LINE = '{injectPagesHere:"injectPagesHere"}';

function buildHTML(srcDir) {
    const index = JSON.parse(fs.readFileSync(path.join(srcDir, 'index.json'), 'utf-8'));
    return index.map(obj => {
        const subSrc = path.join(srcDir, obj.src);
        const subStat = fs.lstatSync(subSrc);

        const outObj = {name: obj.name};

        if (subStat.isDirectory()) {
            outObj.sec = buildHTML(subSrc);
        } else {
            outObj.comp = markdown.toHTML(fs.readFileSync(subSrc, 'utf-8'));
        }

        return outObj;
    });
}

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

rimraf(generatedDir, () => {
    const pages = buildHTML(contentDir);
    fs.mkdirSync(generatedDir);

    // Copy over each react file
    fs.readdirSync(REACT_DIR).forEach(file => {
        let content = fs.readFileSync(path.join(REACT_DIR, file), 'utf-8');
        if (path.parse(file).ext.toLowerCase() === '.js') {
            content = content.replace(INJECT_LINE, JSON.stringify(pages));
        }
        fs.writeFileSync(path.join(generatedDir, file), content);
    });
});
