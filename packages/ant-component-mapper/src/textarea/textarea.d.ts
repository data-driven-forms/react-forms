import { FormGroupProps } from "../form-group";

import { TextAreaProps } from "antd/lib/input";

export type TextareaProps = TextAreaProps & FormGroupProps;

declare const Textarea: React.ComponentType<TextareaProps>;

export default Textarea;
