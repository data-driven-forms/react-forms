export interface ExtendedMapperComponent extends Object {
  component: string;
}

interface ComponentMapper {
  [key: string]: string | ExtendedMapperComponent;
}

export default ComponentMapper;
