import { type FC } from 'react';
import { type CharacterFileObject } from '../types';
import { getNameString } from '../../utils/stringHelpers/getNameString';
import { Layout } from './Layout';

interface CharacterDirectoryProps {
  characters: CharacterFileObject[];
}

export const CharacterDirectory: FC<CharacterDirectoryProps> = ({
  characters,
}) => {
  return (
    <Layout title="Characters">
      <h1>Characters</h1>
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
    </Layout>
  );
};
