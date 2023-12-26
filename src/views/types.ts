import { type Character } from '../../types/schema';

export interface CharacterFileObject {
  contents: Character | null;
  jsonFileName: string;
  htmlFilePath: string;
  pdfFilePath: string;
}
