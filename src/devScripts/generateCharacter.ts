
import { fileExists } from '../utils/fileSystem/fileExists';
import { getFileContents } from '../utils/fileSystem/getFileContents';
import path from 'path';
import { setFileContents } from '../utils/fileSystem/setFileContents';

const generateCharacter = async () => {
  const fileName = process.argv[2];

  if (!fileName) {
    console.log('provide a file name as an argument');
    return;
  }
  
  const downloadFilePath = path.join(__dirname, `../../assets/characters/${fileName}.character.json`);
  
  if (fileExists(downloadFilePath)) {
    console.error('this character already exists');
    return;
  }

  const json = getFileContents(path.join(__dirname, '../fixtures/default.character.json'));

  setFileContents(downloadFilePath, json);

  console.log(`New character saved at: ${downloadFilePath}`);
};

generateCharacter();
