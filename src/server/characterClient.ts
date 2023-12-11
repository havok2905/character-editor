import { type ICharacter } from '../types/dnd/ICharacter';
import fs from 'fs';
import path from 'path';

const getFilePathString = (fileName: string, extension: string): string => {
  return path.join(__dirname, `../../world/characters/${fileName}.${extension}`);
};

const getFileContents = (fileName: string, extension: string): string => {
  const pathString = getFilePathString(fileName, extension);
  if (!fs.existsSync(pathString)) return '';
  return fs.readFileSync(pathString, 'utf8');
};

const setFileContents = (fileName: string, extension: string, contents: string): void => {
  const pathString = getFilePathString(fileName, extension);
  fs.writeFileSync(pathString, contents);
};

export const getCharacter = (id: string): ICharacter | null => {
  const contents = getFileContents(id, 'json');
  if (!contents) return null;
  return JSON.parse(contents) as ICharacter;
};

export const saveCharacter = (id: string, character: ICharacter): ICharacter => {
  const contents = JSON.stringify(character);
  setFileContents(id, 'json', contents);
  return character;
};
