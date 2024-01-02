import { type Creature } from '../../types/schema';
import { CreatureSheetPage } from './characterHtmlPages/CreatureSheet';
import { renderToStaticMarkup } from 'react-dom/server';
import { setFileContents } from '../utils/fileSystem/setFileContents';

export const creatureToHtml = (creature: Creature, downloadFilePath: string) => {
  const contents = renderToStaticMarkup(<CreatureSheetPage creature={creature}/>);
  setFileContents(downloadFilePath, contents);
};
