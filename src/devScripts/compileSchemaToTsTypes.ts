import { compileFromFile } from 'json-schema-to-typescript';
import fs from 'fs';
import path from 'path';

/**
 * https://github.com/bcherny/json-schema-to-typescript/issues/519#issuecomment-1496109111
 * 
 * There is currently an issue with reading $ref to other schemas
 * via the cwd option for compileFromFile. This is a work around
 * until that issue is patched.
 */
compileFromFile(path.join(__dirname, '../../schemas/schema.json'), {
  $refOptions: {
    resolve: {
      file: {
        async read(file): Promise<string> {
          if (
            process.platform === 'win32' &&
            file.url.split(':').length > 1
          ) {
            /* eslint-disable */
            [ , file.url ] = file.url.match(/(.:[^:]+)$/) ?? [ , 'error' ];
          }
  
          return fs.readFileSync(file.url, 'utf8');
        },
      },
    },
  },
})
  .then((ts) => {
    return fs.writeFileSync(
      path.join(__dirname, '../../types/schema.d.ts'), ts
    );
  });
