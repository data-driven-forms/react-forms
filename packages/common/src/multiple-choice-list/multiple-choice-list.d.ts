import { AnyObject } from "@data-driven-forms/react-form-renderer";

export interface MultipleChoiceListProps<WrapperProps = any, CheckBoxProps = any> extends AnyObject {
  name: string;
  Wrapper: React.ComponentType<WrapperProps>;
  Checkbox: React.ComponentType<CheckBoxProps>;
}


declare const MultipleChoiceList: React.ComponentType<MultipleChoiceListProps>

export const wrapperProps: AnyObject;
export default MultipleChoiceList;
