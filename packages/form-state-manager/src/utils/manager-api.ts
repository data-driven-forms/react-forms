import CreateManagerApi, { ManagerState, ManagerApi } from '../types/manager-api';

const createManagerApi: CreateManagerApi = () => {
  const state: ManagerState = {
    values: {},
    errors: {},
    pristine: true,
    change,
  }
  function change(name: string, value?: any): any{
    state.values[name] = value
 }
  const managerApi: ManagerApi = () => state

  return managerApi
}

export default createManagerApi
