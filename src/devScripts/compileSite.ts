import fs from 'fs';
import { type Creature, type Character } from '../../types/schema';
import { type CharacterFileObject, type CreatureFileObject } from '../views/types';
import { characterToHtml } from '../views/characterToHtml';
import { characterToPdf } from '../views/characterToPdf';
import { creatureToHtml } from '../views/creatureToHtml';
import { creatureToPdf } from '../views/creatureToPdf';
import { directoryToHtml } from '../views/directoryIndex';
import { getFileContents } from '../utils/fileSystem/getFileContents';
import path from 'path';

const getCharacterFiles = () => {
  return fs.readdirSync(path.join(__dirname, '../../assets/characters'));
};

const getCreatureFiles = () => {
  return fs.readdirSync(path.join(__dirname, '../../assets/creatures'));
};

const getCharacter = (jsonFileName: string): CharacterFileObject => {
  const characterFileName = path.parse(jsonFileName).name;
  const contents = getFileContents(path.join(__dirname, `../../assets/characters/${jsonFileName}`));
  const htmlFilePath = path.join(__dirname, `../../bundle/${characterFileName}.html`);
  const pdfFilePath = path.join(__dirname, `../../bundle/${characterFileName}.pdf`);

  return {
    contents: !contents ? null : JSON.parse(contents) as Character,
    jsonFileName,
    htmlFilePath,
    pdfFilePath,
  };
};

const getCreature = (jsonFileName: string): CreatureFileObject => {
  const creatureFileName = path.parse(jsonFileName).name;
  const contents = getFileContents(path.join(__dirname, `../../assets/creatures/${jsonFileName}`));
  const htmlFilePath = path.join(__dirname, `../../bundle/${creatureFileName}.html`);
  const pdfFilePath = path.join(__dirname, `../../bundle/${creatureFileName}.pdf`);

  return {
    contents: !contents ? null : JSON.parse(contents) as Creature,
    jsonFileName,
    htmlFilePath,
    pdfFilePath,
  };
};

const getCharacters = (): CharacterFileObject[] => {
  const characterFiles = getCharacterFiles();
  return characterFiles.map((fileName) => getCharacter(fileName));
};

const getCreatures = (): CreatureFileObject[] => {
  const creatureFiles = getCreatureFiles();
  return creatureFiles.map((fileName) => getCreature(fileName));
};

const compileSite = async () => {
  const characters = getCharacters();
  const creatures = getCreatures();

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
  
    const pdf = characterToPdf(contents);
    pdf.pipe(fs.createWriteStream(pdfFilePath));
    pdf.end();

    console.log(`Characters saved at: ${htmlFilePath}`);
    console.log(`Characters saved at: ${pdfFilePath}`);
  });

  creatures.forEach(creatureFileObject => {
    const {
      contents,
      jsonFileName,
      htmlFilePath,
      pdfFilePath,
    } = creatureFileObject;

    if (!contents) {
      console.log('There was an issue parsing the creature', jsonFileName);
      return;
    }

    creatureToHtml(contents, htmlFilePath);

    const pdf = creatureToPdf(contents);
    pdf.pipe(fs.createWriteStream(pdfFilePath));
    pdf.end();

    console.log(`Creatures saved at: ${htmlFilePath}`);
    console.log(`Creatures saved at: ${pdfFilePath}`);
  });

  const htmlDirectoryIndexFilePath = path.join(__dirname, '../../bundle/index.html');
  directoryToHtml(characters, creatures, htmlDirectoryIndexFilePath);
  console.log(`Directory index saved at: ${htmlDirectoryIndexFilePath}`);

  fs.cpSync(path.join(__dirname, '../../assets/css/main.css'), path.join(__dirname, '../../bundle/main.css'));
  console.log('main.css was copied to bundle/');

  fs.cpSync(path.join(__dirname, '../../assets/css/reset.css'), path.join(__dirname, '../../bundle/reset.css'));
  console.log('reset.css was copied to bundle/');

  fs.cpSync(path.join(__dirname, '../../assets/tokens'), path.join(__dirname, '../../bundle/'), { recursive: true });
  console.log('tokens were copied to bundle/');
};

compileSite();
