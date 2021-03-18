export interface FieldArrayApi {
  concat: (name: string, value: any[]) => void;
  forEach: (name: string, iterator: (name: string, index: number) => void) => void;
  insert: (name: string, index: number, value?: any) => void;
  map: (name: string, iterator: (name: string, index: number) => string) => string[];
  move: (name: string, from: number, to: number) => void;
  pop: (name: string) => any;
  push: (name: string, value?: any) => void;
  remove: (name: string, index: number) => void;
  removeBatch: (name: string, indexes: number[]) => void;
  shift: (name: string) => any;
  swap: (name: string, a: number, b: number) => void;
  unshift: (name: string, value: any) => void;
  update: (name: string, index: number, value: any) => void;
}

export default FieldArrayApi;
