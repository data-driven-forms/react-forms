export interface ActionMapper {
  [key: string]: (...args: any[]) => any;
}
