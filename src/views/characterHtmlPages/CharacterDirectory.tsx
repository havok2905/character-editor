import { type FC } from 'react';
import { type CreatureFileObject, type CharacterFileObject } from '../types';
import { getNameString } from '../../utils/stringHelpers/getNameString';
import { Layout } from './Layout';

interface CharacterDirectoryProps {
  characters: CharacterFileObject[];
  creatures: CreatureFileObject[];
}

export const CharacterDirectory: FC<CharacterDirectoryProps> = ({
  characters,
  creatures,
}) => {
  return (
    <Layout title="Characters and Creatures">
      <h1>Characters and Creatures</h1>
      <h2>Characters</h2>
      <ul>
        {
          characters.map((characterObject, index) => {
            const {
              contents,
              htmlFilePath,
            } = characterObject;

            if (!contents || !htmlFilePath) return null;

            return (
              <li key={index}>
                <a href={htmlFilePath}>
                  {getNameString(contents.biography.name)}
                </a>
              </li>
            );
          })
        }
      </ul>
      <h2>Creatures</h2>
      <ul>
        {
          creatures.map((creatureObject, index) => {
            const {
              contents,
              htmlFilePath,
            } = creatureObject;

            if (!contents || !htmlFilePath) return null;

            return (
              <li key={index}>
                <a href={htmlFilePath}>
                  {contents.name}
                </a>
              </li>
            );
          })
        }
      </ul>
    </Layout>
  );
};
