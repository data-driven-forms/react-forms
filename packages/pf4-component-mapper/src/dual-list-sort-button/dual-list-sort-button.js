import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonVariant } from '@patternfly/react-core';

import { PficonSortCommonAscIcon, PficonSortCommonDescIcon } from '@patternfly/react-icons';

import DualListContext from '../dual-list-context';

const DualListSortButton = ({ position, ...rest }) => {
  const { sortConfig, setSortConfig } = useContext(DualListContext);

  return (
    <Button
      variant={ButtonVariant.plain}
      onClick={
        sortConfig[position] === 'asc'
          ? () => setSortConfig({ ...sortConfig, [position]: 'desc' })
          : () => setSortConfig({ ...sortConfig, [position]: 'asc' })
      }
      aria-label="Sort"
      {...rest}
    >
      {sortConfig[position] === 'asc' ? <PficonSortCommonAscIcon /> : <PficonSortCommonDescIcon />}
    </Button>
  );
};

DualListSortButton.propTypes = {
  position: PropTypes.oneOf(['left', 'right'])
};

export default DualListSortButton;
