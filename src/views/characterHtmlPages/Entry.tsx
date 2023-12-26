import { type FC } from 'react';
import {
  type List,
  type SubEntry,
  type Table
} from '../../../types/schema';

interface EntryProps {
  entry: Table | List | SubEntry | string;
}

export const Entry: FC<EntryProps> = ({
  entry
}) => {
  if (typeof entry === 'string') return <p>{entry}</p>;

  if (entry.type === 'list') {
    return (
      <ul>
        {
          entry.items.map((item, index) => <li key={index}>{item}</li>)
        }
      </ul>
    );
  }

  if (entry.type === 'table') {
    return (
      <table>
        <thead>
          <tr>
            {
              entry.columnLabels.map((label, index) => {
                return (
                  <th key={index} scope='col'>
                    {label}
                  </th>
                );
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            entry.rows.map((row, index) => {
              return (
                <tr key={index}>
                  {
                    row.map((rowString, index) => <td key={index}>{rowString}</td>)
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }

  if (entry.type === 'subEntry') {
    return (
      <>
        <p><strong>{entry.name}</strong></p>
        {
          entry.entries.map((e, index) => <Entry entry={e} key={index}/>)
        }
      </>
    );
  }

  return null;
};
