import { ManagerState } from '../types/manager-api';
import isEqual from 'lodash/isEqual';

const denyList = ['fieldListeners'];

function findDifference(oldState: ManagerState, newState: ManagerState): Array<keyof ManagerState> {
  const changed: Array<keyof ManagerState> = [];

  const keys = Object.keys(oldState)
    .map((key) => (typeof oldState[key as keyof ManagerState] !== 'function' && !denyList.includes(key) ? key : undefined))
    .filter(Boolean);

  keys.forEach((key) => {
    if (key && !isEqual(oldState[key as keyof ManagerState], newState[key as keyof ManagerState])) {
      changed.push(key as keyof ManagerState);
    }
  });

  return changed;
}

export default findDifference;
