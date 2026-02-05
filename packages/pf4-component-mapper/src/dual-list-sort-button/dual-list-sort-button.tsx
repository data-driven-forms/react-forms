import React, { useContext } from 'react';
import { Button, ButtonVariant } from '@patternfly/react-core';

import { PficonSortCommonAscIcon, PficonSortCommonDescIcon } from '@patternfly/react-icons';

import DualListContext from '../dual-list-context/dual-list-context';

interface DualListSortButtonProps {
  position: string;
  [key: string]: any;
}

const DualListSortButton: React.FC<DualListSortButtonProps> = ({ position, ...rest }) => {
  const { sortConfig, setSortConfig } = useContext(DualListContext);

  return (
    <Button
      icon={sortConfig[position] === 'asc' ? <PficonSortCommonAscIcon /> : <PficonSortCommonDescIcon />}
      variant={ButtonVariant.plain}
      onClick={
        sortConfig[position] === 'asc'
          ? () => setSortConfig({ ...sortConfig, [position]: 'desc' })
          : () => setSortConfig({ ...sortConfig, [position]: 'asc' })
      }
      aria-label="Sort"
      {...rest}
    />
  );
};

export default DualListSortButton;
