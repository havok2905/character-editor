import fs from 'fs';
import { type Character } from '../../../types/schema';
import { characterToHtml } from '../../views/characterToHtml';
import { characterToPdf } from '../../views/characterToPdf';
import { getFileContents } from '../../utils/fileSystem/getFileContents';
import path from 'path';
import prompts, { type PromptObject } from 'prompts';

const getCharacterFiles = () => {
  return fs.readdirSync(path.join(__dirname, '../../../world/characters'));
};

const getCharacter = (fileName: string): [(Character | null), string] => {
  const contents = getFileContents(path.join(__dirname, `../../../world/characters/${fileName}`));

  return [
    !contents ? null : JSON.parse(contents),
    fileName,
  ];
};

const getCharacters = (): [(Character | null), string][] => {
  const characterFiles = getCharacterFiles();
  return characterFiles.map((fileName) => getCharacter(fileName));
};

export const characterExport = async () => {
  const characterFiles = getCharacterFiles();
  
  const questions: PromptObject<string>[] = [
    {
      type: 'select',
      name: 'fileName',
      message: 'Which character?',
      choices: [
        {
          title: 'All',
          value: 'all',
        },
        ...characterFiles.filter(item => {
          return item !== '.gitkeep';
        }).map(file => {
          return {
            title: file,
            value: file,
          };
        })
      ],
      initial: 0,
    },
    {
      type: 'select',
      name: 'outputExtension',
      message: 'Which export type?',
      choices: [
        { title: 'All (HTML and PDF)', value: 'all' },
        { title: 'HTML', value: 'html' },
        { title: 'PDF', value: 'pdf' },
      ],
      initial: 0,
    },
    {
      type: 'select',
      name: 'override',
      message: 'Create new file or override?',
      choices: [
        { title: 'Override', value: 'override' },
        { title: 'New', value: 'new' },
      ],
      initial: 0,
    }
  ];

  const { fileName, outputExtension, override } = await prompts(questions);

  if (!fileName || !outputExtension || !override) return;

  const characters = fileName === 'all'
    ? getCharacters()
    : [ getCharacter(fileName) ];

  if (!characters.filter((character) => {
    return character[0] !== null;
  }).length) {
    console.error('There was an issue fetching characters.');
    return;
  }

  characters.forEach(([ character, fileName ]) => {
    const characterFileName = path.parse(fileName).name;

    console.log(characterFileName);

    if (!characterFileName) {
      console.log('There was an issue parsing the character file name');
      return;
    }
  
    let downloadFilePaths = [];
  
    switch (outputExtension) {
      case 'all':
        downloadFilePaths = [
          path.join(__dirname, `../../../world/downloads/${characterFileName}${override === 'new' ? Date.now() : ''}.html`),
          path.join(__dirname, `../../../world/downloads/${characterFileName}${override === 'new' ? Date.now() : ''}.pdf`)
        ];
        characterToHtml(character as Character, downloadFilePaths[0]);
        characterToPdf(character as Character).save(downloadFilePaths[1]);
        break;
      case 'html':
        downloadFilePaths = [
          path.join(__dirname, `../../../world/downloads/${characterFileName}${override === 'new' ? Date.now() : ''}.html`)
        ];
        characterToHtml(character as Character, downloadFilePaths[0]);
        break;
      case 'pdf':
        downloadFilePaths = [
          path.join(__dirname, `../../../world/downloads/${characterFileName}${override === 'new' ? Date.now() : ''}.pdf`)
        ];
        characterToPdf(character as Character).save(downloadFilePaths[0]);
        break;
      default:
        console.error('Could not save. No valid export type was chosen');
        return;
    }
  
    downloadFilePaths.forEach((filePath) => {
      console.log(`Characters saved at: ${filePath}`);
    });
  });  
};
