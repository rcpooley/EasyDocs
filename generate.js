const fs = require('fs');
const path = require('path');
const markdown = require('markdown').markdown;
const rimraf = require('rimraf');

function generateComponents(src, dst) {
    const stat = fs.lstatSync(src);
    if (stat.isDirectory()) {
        fs.mkdirSync(dst);
        const index = JSON.parse(fs.readFileSync(path.join(src, 'index.json'), 'utf-8'));
        let outIndex = '';
        let exportDefault = 'export default [\n';
        index.forEach(obj => {
            const subSrc = path.join(src, obj.src);
            const subDst = path.join(dst, obj.src);
            generateComponents(subSrc, subDst);

            const name = path.parse(obj.src).name;
            outIndex = `import ${name} from './${name}';\n${outIndex}`;
            const srcStat = fs.lstatSync(subSrc);
            exportDefault += `    {name: "${obj.name}", ${srcStat.isDirectory() ? 'sec' : 'comp'}: ${name}},\n`;
        });
        exportDefault += '];';
        outIndex += `\n${exportDefault}`;
        fs.writeFileSync(path.join(dst, 'index.jsx'), outIndex);
    } else {
        const dstInfo = path.parse(dst);
        fs.writeFileSync(path.join(dstInfo.dir, `${dstInfo.name}.jsx`),
            `import React from 'react';\nexport default () => <div>${markdown.toHTML(fs.readFileSync(src, 'utf-8'))}</div>;`);
    }
}

module.exports = function (contentDir, genDir, cb) {
    rimraf(genDir, () => {
        generateComponents(contentDir, genDir);
        if (cb) cb();
    });
};
