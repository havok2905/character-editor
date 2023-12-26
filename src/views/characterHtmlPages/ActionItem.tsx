import { type Action } from '../../../types/schema';
import { Entry } from './Entry';
import { type FC } from 'react';

interface ActionItemProps {
  action: Action;
}

export const ActionItem: FC<ActionItemProps> = ({
  action,
}) => {
  return (
    <div>
      <h3>{action.name}</h3>
      {
        action.entries.map((entry, index) => <Entry entry={entry} key={index}/>)
      }
    </div>
  );
};
