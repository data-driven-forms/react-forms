import React, { useEffect } from 'react';
import { render, cleanup } from '@testing-library/react';

import useIsMounted from '../../hooks';

describe('useIsMounted', () => {
  it('mounts and unmounts', async () => {
    expect.assertions(2);

    const isMountedSpy = ({ current }) => current;

    const Dummy = () => {
      const isMounted = useIsMounted();

      useEffect(() => {
        expect(isMountedSpy(isMounted)).toEqual(true);

        return () => {
          expect(isMountedSpy(isMounted)).toEqual(false);
        };
      });

      return <span>Dummy</span>;
    };

    render(<Dummy />);

    cleanup();
  });
});
