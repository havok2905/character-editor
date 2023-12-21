import fs from 'fs';
import { type Character } from '../../../types/schema';
import { characterToPdf } from '../../views/characterToPdf';
import { getFileContents } from '../../utils/fileSystem/getFileContents';
import path from 'path';
import prompts, { type PromptObject } from 'prompts';

const getCharacter = (fileName: string): Character | null => {
  const contents = getFileContents(path.join(__dirname, `../../../world/characters/${fileName}`));
  if (!contents) return null;
  return JSON.parse(contents);
};

export const characterExport = async () => {
  const characterFiles = fs.readdirSync(path.join(__dirname, '../../../world/characters'));
  
  const questions: PromptObject<string>[] = [
    {
      type: 'select',
      name: 'fileName',
      message: 'Which character?',
      choices: characterFiles.filter(item => {
        return item !== '.gitkeep';
      }).map(file => {
        return {
          title: file,
          value: file,
        };
      }),
      initial: 0,
    },
    {
      type: 'select',
      name: 'outputExtension',
      message: 'Which export type?',
      choices: [
        { title: 'PDF', value: 'pdf' },
      ],
      initial: 0,
    },
    {
      type: 'select',
      name: 'override',
      message: 'Create new file or override?',
      choices: [
        { title: 'New', value: 'new' },
        { title: 'Override', value: 'override' },
      ],
      initial: 0,
    }
  ];

  const { fileName, outputExtension, override } = await prompts(questions);

  if (!fileName || !outputExtension || !override) return;

  const character = getCharacter(fileName);

  if (!character) {
    console.error('There was an issue fetching this character.');
    return;
  }

  const characterFileName = path.parse(fileName).name;

  if (!characterFileName) {
    console.log('There was an issue parsing the character file name');
    return;
  }

  let downloadFilePath = '';

  switch (outputExtension) {
    case 'pdf':
      downloadFilePath = path.join(__dirname, `../../../world/downloads/${characterFileName}${override === 'new' ? Date.now() : ''}.pdf`);
      characterToPdf(character).save(downloadFilePath);
      break;
    default:
      console.error('Could not save. No valid export type was chosen');
      return;
  }

  console.log(`Character saved at: ${downloadFilePath}`);
};
