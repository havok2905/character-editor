import { type Character } from '../../types/schema';
import { type CharacterFileObject } from './types';
import { CharacterDirectory } from './characterHtmlPages/CharacterDirectory';
import { CharacterSheet } from './characterHtmlPages/CharacterSheet';
import { renderToStaticMarkup } from 'react-dom/server';
import { setFileContents } from '../utils/fileSystem/setFileContents';

export const characterToHtml = (character: Character, downloadFilePath: string) => {
  const contents = renderToStaticMarkup(<CharacterSheet character={character}/>);
  setFileContents(downloadFilePath, contents);
};

export const charactersToHtml = (characters: CharacterFileObject[], downloadFilePath: string) => {
  const contents = renderToStaticMarkup(<CharacterDirectory characters={characters}/>);
  setFileContents(downloadFilePath, contents);
};
