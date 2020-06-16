interface ActionMapper {
  [key: string]: (...args: any[]) => any;
}

export default ActionMapper;
