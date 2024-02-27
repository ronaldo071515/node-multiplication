import { yarg } from './config/plugins/yargs.plugin';
import { ServerApp } from './presentation/server-app';


// console.log(process.argv);
// console.log(yarg.b);

//función anonima async auto-invocada con node
(async () => {
    await main();
    // console.log('End aplication');
})();


async function main() { 
    const { b: base, l: limit, s: showTable, n: fileName, d: fileDestination } = yarg;
    ServerApp.run({ base, limit, showTable, fileName, fileDestination });
}