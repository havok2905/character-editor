import fs from 'fs';
import { type Character } from '../../../types/schema';
import { type CharacterFileObject } from '../../views/types';
import { characterToHtml, charactersToHtml } from '../../views/characterToHtml';
import { characterToPdf } from '../../views/characterToPdf';
import { getFileContents } from '../../utils/fileSystem/getFileContents';
import path from 'path';

const getCharacterFiles = () => {
  return fs.readdirSync(path.join(__dirname, '../../../world/characters'));
};

const getCharacter = (jsonFileName: string): CharacterFileObject => {
  const characterFileName = path.parse(jsonFileName).name;
  const contents = getFileContents(path.join(__dirname, `../../../world/characters/${jsonFileName}`));
  const htmlFilePath = path.join(__dirname, `../../../world/downloads/${characterFileName}.html`);
  const pdfFilePath = path.join(__dirname, `../../../world/downloads/${characterFileName}.pdf`);

  return {
    contents: !contents ? null : JSON.parse(contents) as Character,
    jsonFileName,
    htmlFilePath,
    pdfFilePath,
  };
};

const getCharacters = (): CharacterFileObject[] => {
  const characterFiles = getCharacterFiles();
  return characterFiles.map((fileName) => getCharacter(fileName));
};

export const characterExport = async () => {
  const characters = getCharacters();

  characters.forEach(characterFileObject => {
    const {
      contents,
      jsonFileName,
      htmlFilePath,
      pdfFilePath,
    } = characterFileObject;

    if (!contents) {
      console.log('There was an issue parsing the character', jsonFileName);
      return;
    }

    characterToHtml(contents, htmlFilePath);
    characterToPdf(contents).save(pdfFilePath);

    console.log(`Characters saved at: ${htmlFilePath}`);
    console.log(`Characters saved at: ${pdfFilePath}`);
  });

  const htmlCharacterIndexFilePath = path.join(__dirname, '../../../world/downloads/index.html');
  charactersToHtml(characters, htmlCharacterIndexFilePath);
};
