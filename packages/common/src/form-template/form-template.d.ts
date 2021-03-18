import { AnyObject, FormTemplateRenderProps } from "@data-driven-forms/react-form-renderer";
import { ElementType } from "react";

export interface FormTemplateCommonProps extends FormTemplateRenderProps {
    FormWrapper?: ElementType;
    Title?: ElementType;
    Description?: ElementType;
    Button?: ElementType;
    ButtonGroup?: ElementType;
    formWrapperProps?: AnyObject;
    showFormControls?: boolean;
    disableSubmit?: string[];
    Header?: ElementType;
    headerProps?: AnyObject;
    titleProps?: AnyObject;
    descriptionProps?: AnyObject;
    buttonGroupProps?: AnyObject;
    buttonsProps?: AnyObject
}

export default FormTemplateCommonProps;
