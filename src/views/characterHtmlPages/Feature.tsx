import { type FC } from 'react';
import { type Feature as FeatureType } from '../../../types/schema';

import { Entry } from './Entry';

interface FeatureProps {
  feature: FeatureType;
}

export const Feature: FC<FeatureProps> = ({
  feature,
}) => {
  return (
    <div>
      <h3>{feature.name}</h3>
      {
        feature.entries.map((entry, index) => <Entry entry={entry} key={index}/>)
      }
    </div>
  );
};
