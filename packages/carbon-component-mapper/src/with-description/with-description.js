import React from 'react';
import { createUseStyles } from 'react-jss';

import { Toggletip, ToggletipButton, ToggletipContent } from '@carbon/react';
import { Information } from '@carbon/react/icons';

const useStyles = createUseStyles({
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
});

const WithDescription = ({ labelText, description }) => {
  const { container } = useStyles();

  return (
    <div className={container}>
      <span>{labelText}</span>
      <Toggletip align="bottom">
        <ToggletipButton label="Show information">
          <Information />
        </ToggletipButton>
        <ToggletipContent>
          <p>{description}</p>
        </ToggletipContent>
      </Toggletip>
    </div>
  );
};

export default WithDescription;
