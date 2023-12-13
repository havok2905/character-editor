import fs from 'fs';

export const getFileContents = (pathString: string): string => {
  if (!fs.existsSync(pathString)) return '';
  return fs.readFileSync(pathString, 'utf8');
};
