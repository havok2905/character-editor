import fs from 'fs';

export const setFileContents = (pathString: string, contents: string): void => {
  fs.writeFileSync(pathString, contents);
};
