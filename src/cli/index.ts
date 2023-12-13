import { characterExport } from './commands/characterExport';
import { generateCharacter } from './commands/generateCharacter';
import yargs from 'yargs';

(async () => {
  yargs
    .scriptName('character-editor')
    .usage('$0 <cmd> [args]')
    .command(
      'export',
      'export a character (pdf or md)',
      () => {},
      () => { characterExport(); }
    )
    .command(
      'generate',
      'generate a blank character',
      () => {},
      () => { generateCharacter(); }
    )
    .help()
    .argv;
})();
