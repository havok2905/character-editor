import { type Character } from '../../types/schema';
import { CharacterSheet } from './characterHtmlPages/characterSheet';
import { renderToStaticMarkup } from 'react-dom/server';
import { setFileContents } from '../utils/fileSystem/setFileContents';

export const characterToHtml = (character: Character, downloadFilePath: string) => {
  const contents = renderToStaticMarkup(<CharacterSheet character={character}/>);
  setFileContents(downloadFilePath, contents);
};
