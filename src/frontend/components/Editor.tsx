import React, { type FC, useEffect, useState } from 'react';
import { characterSchema } from '../../shared/schema-validators/dnd/characterSchema';
import { CharacterSheet } from './CharacterSheet';
import { getCharacter } from '../api/getCharacter';
import { type ICharacter } from '../../types/dnd/ICharacter';
import MonacoEditor from '@monaco-editor/react';
import { useQuery } from 'react-query';
import { type ZodIssue } from 'zod';

export const Editor: FC = () => {
  const [ value, setValue ] = useState<string | null>(null);
  const [ valueObject, setValueObject ] = useState<ICharacter | null>(null);
  const [ errors, setErrors ] = useState<ZodIssue[]>([]);
  const [ isValid, setIsValid ] = useState<boolean>(true);

  const {
    data,
    isLoading,
    isSuccess
  } = useQuery([ 'character', '1' ], getCharacter('1'));

  useEffect(() => {
    if (isSuccess) {
      setValue(JSON.stringify(data, null, 2));
      setValueObject(data);
    }
  }, [ isSuccess ]);

  const handleEditorChange = (value: string | undefined) => {
    const object = JSON.parse(value ?? '') as ICharacter;
    
    setValue(value ?? '');
    setValueObject(object);
    
    const result = characterSchema.safeParse(object);

    if (!result.success) {
      setIsValid(false);
      setErrors(result.error.issues);
    } else {
      setIsValid(true);
      setErrors([]);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', height: '50px' }}>
        <button>
          Save Character
        </button>
        <button>
          Export PDF
        </button>
        <button>
          Export Markdown
        </button>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <MonacoEditor
            defaultValue={JSON.stringify({}, null, 2)}
            height='80vh'
            language='json'
            onChange={handleEditorChange}
            value={value ?? ''}
            theme="vs-dark"
            width='100%'/>
        </div>
        <div style={{ height: '80vh', overflow: 'scroll', width: '50%' }}>
          {
            isLoading && <p>Loading...</p>
          }
          {
            !isLoading && data && <CharacterSheet character={valueObject}/>
          }
        </div>
      </div>
      <div style={{ backgroundColor: 'black', color: 'white', height: '100px' }}>
        <p>
          isValid: { isValid ? 'Yes' : 'No' }
        </p>
        {
          errors.length ? (
            <ul>
              {
                errors.map((error) => {
                  return (
                    <li>
                      {error.path.join('/')}
                      {': '}
                      {error.message}
                    </li>
                  );
                })
              }
            </ul>
          ) : null
        }
      </div>
    </>
  );
};
