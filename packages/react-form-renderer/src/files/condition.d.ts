export interface ActionResolution {
  visible?: boolean;
  set?: object; // TO DO specify this
}

export interface ConditionProp {
  when?: string | string[];
  is?: any;
  isNotEmpty?: boolean;
  isEmpty?: boolean;
  pattern?: string | RegExp;
  notMatch?: any;
  then?: ActionResolution;
  else?: ActionResolution;
  or?: ConditionProp | ConditionProp[];
  and?: ConditionProp | ConditionProp[];
  not?: ConditionProp | ConditionProp[];
}

export interface ConditionDefinition extends ConditionProp {
  or?: ConditionProp | ConditionProp[];
  and?: ConditionProp | ConditionProp[];
  not?: ConditionProp | ConditionProp[];
  sequence?: ConditionProp[];
}

export interface ConditionProps {
  values: object;
  children: React.ReactChildren;
  condition?: ConditionDefinition | ConditionDefinition[];
}

declare const Condition: React.ComponentType<ConditionProps>;

export default Condition;
