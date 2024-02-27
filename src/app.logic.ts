import fs, { mkdirSync } from 'fs';
import { yarg } from './config/plugins/yargs.plugin';

// console.log({yarg});

const { b: base, l: limit, s: showTable } = yarg;

let outputMessage = '';
// const base = b;
const headerMessage = `
======================
    tabla del ${base}       
======================
`;

for (let i = 1; i <= limit; i++) {
    outputMessage += `${ base } x ${ i } = ${ base * i }\n`;
}

outputMessage = headerMessage + outputMessage;
if( showTable ) console.log(outputMessage);

const outputPath = `outputs`;
mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${ outputPath }/tabla-${base}.txt`, outputMessage);
console.log('File crated');