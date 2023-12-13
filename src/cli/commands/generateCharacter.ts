
import { fileExists } from '../../utils/fileSystem/fileExists';
import { getFileContents } from '../../utils/fileSystem/getFileContents';
import path from 'path';
import prompts, { type PromptObject } from 'prompts';
import { setFileContents } from '../../utils/fileSystem/setFileContents';

export const generateCharacter = async () => {
  const questions: PromptObject<string>[] = [
    {
      type: 'text',
      name: 'fileName',
      message: 'File name? (Example: ella-olkereth)',
    },
  ];

  const { fileName } = await prompts(questions);

  if (!fileName) return;
  
  const downloadFilePath = path.join(__dirname, `../../../world/characters/${fileName}.character.json`);
  
  if (fileExists(downloadFilePath)) {
    console.error('this character already exists');
    return;
  }

  const json = getFileContents(path.join(__dirname, '../../fixtures/defaultCharacter.json'));

  setFileContents(downloadFilePath, json);

  console.log(`New character saved at: ${downloadFilePath}`);
};
