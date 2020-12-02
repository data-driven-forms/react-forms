import { Meta } from "@data-driven-forms/react-form-renderer";

export type validationError = (meta: Meta<any>, validateOnMount?: boolean) => boolean | any | undefined;
