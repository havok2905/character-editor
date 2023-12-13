import fs from 'fs';

export const fileExists = (pathString: string): boolean => {
  return fs.existsSync(pathString);
};
