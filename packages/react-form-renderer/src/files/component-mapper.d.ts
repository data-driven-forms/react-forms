import { AnyObject } from "./common";

export interface ExtendedMapperComponent extends AnyObject {
  component: React.ComponentType | React.FunctionComponent | React.ElementType;
}

interface ComponentMapper {
  [key: string]: React.ComponentType | React.FunctionComponent | React.ElementType | ExtendedMapperComponent;
}

export default ComponentMapper;
