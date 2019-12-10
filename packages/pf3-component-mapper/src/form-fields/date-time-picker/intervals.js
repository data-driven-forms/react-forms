import React from 'react';
import { Icon } from 'patternfly-react';

export const PrevInterval = (props) => <td { ...props } >
  <Icon name="angle-left" aria-label="Prev interval" />
</td>;

export const NextInterval = (props) => <td { ...props } >
  <Icon name="angle-right" aria-label="Next interval" />
</td>;
