import React, { type FC, useEffect, useState } from 'react';
import { characterSchema } from '../../shared/schema-validators/dnd/characterSchema';
import { CharacterSheet } from './CharacterSheet';
import { CheckIcon, XIcon } from './icons';
import { getCharacter } from '../api/getCharacter';
import { type ICharacter } from '../../types/dnd/ICharacter';
import MonacoEditor from '@monaco-editor/react';
import { saveCharacter } from '../api/saveCharacter';
import { useMutation, useQuery } from 'react-query';
import { type ZodIssue } from 'zod';
import './Editor.css';

export const Editor: FC = () => {
  const [ value, setValue ] = useState<string | null>(null);
  const [ valueObject, setValueObject ] = useState<ICharacter | null>(null);
  const [ errors, setErrors ] = useState<ZodIssue[]>([]);
  const [ isValid, setIsValid ] = useState<boolean>(true);

  const {
    data,
    isLoading,
    isSuccess
  } = useQuery([ 'character', 'ella-olkereth' ], getCharacter('ella-olkereth'));

  const mutation = useMutation({
    mutationFn: ({
      id,
      character
    }: {
      id: string,
      character: ICharacter
    }) => {
      return saveCharacter(id, character);
    },
  });

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

  const handleExportMarkdown = () => {
    window.location.href = '/character/ella-olkereth/markdown';
  };

  const handleExportPdf = () => {
    window.location.href = '/character/ella-olkereth/pdf';
  };

  const handleSave = () => {
    if (valueObject) {
      mutation.mutate({
        id: 'ella-olkereth',
        character: valueObject
      });
    }
  };

  return (
    <>
      <div className="editor-header">
        <div>
          <button
            className="editor-header-button"
            disabled={!isValid}
            onClick={handleSave}>
            Save Character
          </button>
          <button
            className="editor-header-button"
            onClick={handleExportPdf}>
            Export PDF
          </button>
          <button
            className="editor-header-button"
            onClick={handleExportMarkdown}>
            Export Markdown
          </button>
        </div>
        <p className={`editor-header-validity ${isValid ? 'editor-header-validity-valid' : 'editor-header-validity-invalid'}`}>
          {
            isValid ? (
              <>
                <CheckIcon/> Character is valid
              </>
            ) : (
              <>
                <XIcon/> Character is invalid
              </>
            )
          }
        </p>
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
      <div className="editor-terminal">
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
