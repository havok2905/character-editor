import { type CreatureFileObject, type CharacterFileObject } from './types';
import { CharacterDirectory } from './characterHtmlPages/CharacterDirectory';
import { renderToStaticMarkup } from 'react-dom/server';
import { setFileContents } from '../utils/fileSystem/setFileContents';

export const directoryToHtml = (
  characters: CharacterFileObject[],
  creatures: CreatureFileObject[],
  downloadFilePath: string
) => {
  const contents = renderToStaticMarkup(
    <CharacterDirectory
      characters={characters}
      creatures={creatures}/>
  );

  setFileContents(downloadFilePath, contents);
};
