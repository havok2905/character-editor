import { type Character, type Creature } from '../../types/schema';

export interface CharacterFileObject {
  contents: Character | null;
  jsonFileName: string;
  htmlFilePath: string;
  pdfFilePath: string;
}

export interface CreatureFileObject {
  contents: Creature | null;
  jsonFileName: string;
  htmlFilePath: string;
  pdfFilePath: string;
}
