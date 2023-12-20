import {
  type Character,
  type Feature,
} from '../../../types/schema';
import { type jsPDF } from 'jspdf';
import {
  getFeatures,
  getNameAndHeader,
} from './shared';

export const featureSheet = (
  features: Feature[],
  character: Character,
  doc: jsPDF) => {
  getNameAndHeader(character, doc);

  getFeatures(character, features, doc, 150);
};
