import React, { useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import useIsMounted from '../../hooks';

describe('useIsMounted', () => {
  it('mounts and unmounts', async () => {
    expect.assertions(2);

    let wrapper;
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

    await act(async () => {
      wrapper = mount(<Dummy />);
    });
    wrapper.update();

    await act(async () => {
      wrapper.unmount();
    });
    wrapper.update();
  });
});
