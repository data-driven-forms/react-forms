export interface ActionMapper {
  [key: string]: (...args: any[]) => any;
}

const actionMapper: ActionMapper = {};

export default actionMapper;
