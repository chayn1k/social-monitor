import CSScomb from 'csscomb';
import commander from 'commander';
import prjConfig from '../.csscomb.json';


commander
    .usage('[options] <file ...>')
    .option('-v, --verbose', 'verbose mode')
    .option('--def-config [name]', 'one of predefined configs [csscomb, zen, yandex]')
    .option('--config [path]', 'configuration file path')
    .option('--exclude [path]', 'excluded file paths (comma separated)')
    .option('-l, --lint', 'in case some fixes needed returns an error')
    .parse(process.argv);


// filter `csscomb` arg if csscomb runned from run.js
const args = commander.args = commander.args.filter(el => el !== 'csscomb');


if (!args.length) {
    console.log('No input paths specified');
    commander.help();
}

const defConfigName = commander['def-config'] || prjConfig['def-config'] || '';
const defConfig = defConfigName ? CSScomb.getConfig(defConfigName) : {};
const config = Object.assign(defConfig, prjConfig);

config.verbose = commander.verbose === true || config.verbose;
config.lint = commander.lint;

if (commander.exclude) {
    config.exclude = commander.exclude.split(/\s*[,;]\s*/);
}

const comb = new CSScomb(config);

async function csscomb() {
    return Promise.all(args.map(arg => comb.processPath(arg)))
        .then(res => {
            let changedCount = 0;
            const changedFiles = [].concat.apply([], res)
                .filter(isChanged => isChanged !== undefined);

            for (let itr = changedFiles.length - 1; itr >= 0; itr--) {
                changedCount += changedFiles[itr];
            }

            const changed = config.lint ? 0 : changedCount;

            if (config.verbose) {
                console.log('');
                console.log(changedFiles.length + ' file' + (changedFiles.length === 1 ? '' : 's') + ' processed');
                console.log(changed + ' file' + (changed === 1 ? '' : 's') + ' fixed');
            }
        });
}

export default csscomb;
